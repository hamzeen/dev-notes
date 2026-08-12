"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "./site-header";
import type { KeywordIndex, NoteDocument, SearchRecord } from "./types";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function SearchExperience({ searchIndex, keywordIndex, documents }: { searchIndex: SearchRecord[]; keywordIndex: KeywordIndex; documents: NoteDocument[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const results = useMemo(() => {
    const term = normalize(query); if (!term) return [];
    const keywordIds = Object.entries(keywordIndex).filter(([keyword])=>normalize(keyword).includes(term)).flatMap(([,matches])=>matches.map((match)=>match.id));
    const matches = searchIndex.filter((record)=>keywordIds.includes(record.id) || normalize(`${record.title} ${record.documentTitle} ${record.category} ${record.file}`).includes(term));
    return [...new Map(matches.map((record)=>[record.id, record])).values()].slice(0, 20);
  }, [query, searchIndex, keywordIndex]);

  useEffect(() => {
    const focus = (event: KeyboardEvent) => { if (event.key === "/" && document.activeElement !== searchRef.current) { event.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener("keydown", focus); return () => window.removeEventListener("keydown", focus);
  }, []);

  useEffect(() => {
    const container = resultsRef.current;
    const activeResult = container?.querySelector<HTMLElement>(`[data-result-index="${activeIndex}"]`);
    if (!container || !activeResult) return;

    const visibleTop = container.scrollTop;
    const visibleBottom = visibleTop + container.clientHeight;
    const resultTop = activeResult.offsetTop;
    const resultBottom = resultTop + activeResult.offsetHeight;

    if (resultTop < visibleTop) container.scrollTop = resultTop;
    else if (resultBottom > visibleBottom) container.scrollTop = resultBottom - container.clientHeight;
  }, [activeIndex]);

  const open = (record: SearchRecord) => router.push(`/notes/${record.documentSlug}#${record.sectionSlug}`);
  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setActiveIndex((index)=>(index+1)%results.length); }
    if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setActiveIndex((index)=>(index-1+results.length)%results.length); }
    if (event.key === "Enter" && results.length) { event.preventDefault(); open(results[activeIndex] ?? results[0]); }
  };

  return <main><SiteHeader documents={documents} topics={searchIndex.length} /><section className="hero" id="top"><div className="eyebrow">YOUR TECHNICAL SECOND BRAIN</div><div className="search-shell"><div className="search-row"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input ref={searchRef} value={query} onChange={(event)=>{setQuery(event.target.value);setActiveIndex(0)}} onKeyDown={keyDown} placeholder="Search closures, caching, useEffect..." aria-label="Search your technical notes" autoFocus /><kbd>/</kbd></div>{query && <div className="results" ref={resultsRef} role="listbox">{results.length ? results.map((result,index)=><button key={result.id} data-result-index={index} className={index===activeIndex?"result active":"result"} onMouseEnter={()=>setActiveIndex(index)} onClick={()=>open(result)} role="option" aria-selected={index===activeIndex}><span><strong>{result.title}</strong><small>{result.file}</small></span><span className="category">{result.category}</span></button>) : <div className="empty">No matching heading. Try another keyword.</div>}</div>}</div></section></main>;
}
