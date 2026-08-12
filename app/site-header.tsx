"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NoteDocument } from "./types";

export default function SiteHeader({ documents, topics, compact = false }: { documents: NoteDocument[]; topics: number; compact?: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const groups = useMemo(() => {
    const grouped = documents.reduce<Record<string, NoteDocument[]>>((all, document) => {
      (all[document.category] ??= []).push(document); return all;
    }, {});
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [documents]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close);
  }, []);

  return <>
    <header className={compact ? "topbar result-topbar" : "topbar"}>
      <Link className="brand" href="/"><span className="brand-mark">//</span> dev.notes</Link>
      {compact && <form className="compact-search" action="/"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input name="q" placeholder="Search notes..." aria-label="Search your technical notes" /></form>}
      <button className="library-count" onClick={()=>setDrawerOpen((open)=>!open)} aria-expanded={drawerOpen} aria-controls="notes-drawer"><span className="status-dot" /> {documents.length} files · {topics} topics</button>
    </header>
    <button className={drawerOpen ? "drawer-backdrop open" : "drawer-backdrop"} onClick={()=>setDrawerOpen(false)} aria-label="Close file drawer" tabIndex={drawerOpen ? 0 : -1} />
    <aside id="notes-drawer" className={drawerOpen ? "notes-drawer open" : "notes-drawer"} aria-hidden={!drawerOpen}>
      <div className="drawer-header"><div><span>YOUR LIBRARY</span><h2>All notes</h2></div><button onClick={()=>setDrawerOpen(false)} aria-label="Close file drawer">×</button></div>
      <nav className="drawer-groups" aria-label="All note files">{groups.map(([category, files])=><section className="drawer-group" key={category}><h3>{category}</h3><ul>{files.map((document)=><li key={document.slug}><Link href={`/notes/${document.slug}`} onClick={()=>setDrawerOpen(false)}><span className="file-icon">#</span><span>{document.file}</span></Link></li>)}</ul></section>)}</nav>
    </aside>
  </>;
}
