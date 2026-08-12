import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { codeToHtml } from "shiki";

const root = process.cwd();
const contentDirectory = path.join(root, "content");
const outputFile = path.join(root, "generated", "search-index.json");
const keywordOutputFile = path.join(root, "generated", "keyword.json");
const sectionsOutputFile = path.join(root, "generated", "sections.json");
const documentsOutputFile = path.join(root, "generated", "documents.json");
const slugify = (value) => value.toLowerCase().trim().replace(/&/g, "and").replace(/\./g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const files = (await fs.readdir(contentDirectory)).filter((file) => /\.mdx?$/.test(file));
const records = [];
const sections = [];
const documents = [];

async function renderMarkdown(markdown, headingIds = false) {
  const source = headingIds
    ? markdown.replace(/^###\s+(.+)$/gm, (_, title) => `<h3 id="${slugify(title)}">${title}</h3>`)
    : markdown;
  const tokens = marked.lexer(source);
  for (const token of tokens) {
    if (token.type === "code") {
      token.text = await codeToHtml(token.text, { lang: token.lang || "text", theme: "github-dark-default" });
    }
  }
  const renderer = new marked.Renderer();
  renderer.code = ({ text }) => text.startsWith("<pre class=\"shiki") ? text : `<pre><code>${text}</code></pre>`;
  return marked.parser(tokens, { renderer });
}

for (const file of files) {
  const raw = await fs.readFile(path.join(contentDirectory, file), "utf8");
  const { data, content } = matter(raw);
  const headings = [...content.matchAll(/^###\s+(.+)$/gm)];
  const category = data.category || data.title.replace(/\s+(Concepts|Notes)$/i, "");

  documents.push({
    slug: data.slug,
    title: data.title,
    file,
    category,
    html: await renderMarkdown(content, true),
  });

  for (const [index, heading] of headings.entries()) {
    const title = heading[1].trim();
    const sectionStart = (heading.index ?? 0) + heading[0].length;
    const sectionEnd = headings[index + 1]?.index ?? content.length;
    const markdownBody = content.slice(sectionStart, sectionEnd).trim();
    const sectionBody = markdownBody.replace(/```[\s\S]*?```/g, " ");
    const sectionText = `${title} ${sectionBody}`.toLowerCase();
    const explicitKeywords = (data.keywords ?? []).map(String).filter((keyword) => sectionText.includes(keyword.toLowerCase()));
    const searchableTerms = [...new Set([
      title,
      ...explicitKeywords,
      ...sectionText.matchAll(/\b[a-z][a-z0-9-]{3,}\b/g),
    ].flatMap((term) => typeof term === "string" ? term : term[0]))];
    const record = {
      id: `${data.slug}-${slugify(title)}`,
      documentSlug: data.slug,
      sectionSlug: slugify(title),
      title,
      documentTitle: data.title,
      file,
      category,
      keywords: searchableTerms,
    };
    records.push(record);

    sections.push({ ...record, html: await renderMarkdown(markdownBody) });
  }
}

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, `${JSON.stringify(records, null, 2)}\n`);

const keywordIndex = {};
for (const record of records) {
  for (const keyword of record.keywords) {
    const normalized = String(keyword).toLowerCase().trim();
    if (!normalized) continue;
    keywordIndex[normalized] ??= [];
    if (!keywordIndex[normalized].some((entry) => entry.id === record.id)) {
      keywordIndex[normalized].push({
        id: record.id,
        file: record.file,
        section: record.title,
        documentTitle: record.documentTitle,
        category: record.category,
      });
    }
  }
}

await fs.writeFile(keywordOutputFile, `${JSON.stringify(keywordIndex, null, 2)}\n`);
await fs.writeFile(sectionsOutputFile, `${JSON.stringify(sections, null, 2)}\n`);
await fs.writeFile(documentsOutputFile, `${JSON.stringify(documents, null, 2)}\n`);
console.log(`Generated ${records.length} headings and ${Object.keys(keywordIndex).length} keyword groups.`);
