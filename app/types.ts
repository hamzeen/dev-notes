export type NoteDocument = { slug: string; title: string; file: string; category: string; html: string };
export type SearchRecord = { id: string; documentSlug: string; sectionSlug: string; title: string; documentTitle: string; file: string; category: string; keywords: string[] };
export type KeywordMatch = Pick<SearchRecord, "id" | "file" | "documentTitle" | "category"> & { section: string };
export type KeywordIndex = Record<string, KeywordMatch[]>;

export function categorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
