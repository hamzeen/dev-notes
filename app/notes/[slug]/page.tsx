import Link from "next/link";
import { notFound } from "next/navigation";
import documents from "../../../generated/documents.json";
import searchIndex from "../../../generated/search-index.json";
import SiteHeader from "../../site-header";
import { categorySlug } from "../../types";

export function generateStaticParams() { return documents.map((document)=>({slug:document.slug})); }

export default async function NotePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const document = documents.find((candidate)=>candidate.slug===slug);
  if (!document) notFound();
  return <main className="result-page"><SiteHeader documents={documents} topics={searchIndex.length} compact /><section className="reader-wrap result-reader"><nav className="reader-header breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><b>/</b><Link href={`/category/${categorySlug(document.category)}`}>{document.category}</Link><b>/</b><span aria-current="page">{document.file}</span></nav><article className="markdown full-document"><div className="match-label">COMPLETE FILE</div><h1>{document.title}</h1><div dangerouslySetInnerHTML={{__html:document.html}} /></article></section></main>;
}
