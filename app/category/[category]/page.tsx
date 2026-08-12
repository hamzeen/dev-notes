import Link from "next/link";
import { notFound } from "next/navigation";
import documents from "../../../generated/documents.json";
import searchIndex from "../../../generated/search-index.json";
import SiteHeader from "../../site-header";
import { categorySlug } from "../../types";

export function generateStaticParams() {
  return [...new Set(documents.map((document)=>categorySlug(document.category)))].map((category)=>({category}));
}

export default async function CategoryPage({ params }: { params: Promise<{category:string}> }) {
  const { category } = await params;
  const files = documents.filter((document)=>categorySlug(document.category)===category);
  if (!files.length) notFound();
  const label = files[0].category;
  return <main className="result-page"><SiteHeader documents={documents} topics={searchIndex.length} compact /><section className="reader-wrap result-reader"><nav className="reader-header breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><b>/</b><span aria-current="page">{label}</span></nav><article className="markdown category-view"><div className="match-label">CATEGORY</div><h1>{label}</h1><ul className="category-files">{files.map((document)=><li key={document.slug}><Link className="category-file-row" href={`/notes/${document.slug}`}><span className="category-file-name">{document.file}</span><span className="chevron" aria-hidden="true">›</span></Link></li>)}</ul></article></section></main>;
}
