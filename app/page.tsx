import SearchExperience from "./search-experience";
import { Suspense } from "react";
import searchIndex from "../generated/search-index.json";
import keywordIndex from "../generated/keyword.json";
import documents from "../generated/documents.json";

export default function Home() {
  return <Suspense><SearchExperience searchIndex={searchIndex} keywordIndex={keywordIndex} documents={documents} /></Suspense>;
}
