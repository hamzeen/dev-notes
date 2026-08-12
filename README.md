# Dev Notes Search

A keyboard-first personal knowledge base for searching technical Markdown notes and jumping directly to the relevant section.

## Features

- Instant autosuggest across every Markdown heading and section
- Build-time `keyword.json` mapping keywords to all matching documents
- Arrow-key navigation and Enter-to-open
- Markdown content with Shiki syntax highlighting
- Static generated content for fast, deployment-safe reads
- Responsive, uncluttered search and reader interfaces
- Shareable routes for categories, files, and exact sections

## Routes

```text
/                         Search landing page
/category/frontend        Files in a category
/notes/react              Complete Markdown file
/notes/react#closures     Exact section within a file
```

## Content

Add `.md` or `.mdx` files to `content/`. Each file uses front matter:

```yaml
---
title: JavaScript Concepts
slug: javascript
date: 2026-08-12
author: Hamzeen Hameem
summary: Core JavaScript concepts for quick technical discussions.
keywords: [javascript, closure, scope, event loop]
---
```

Searchable sections use level-three headings:

```md
### Closures

Your notes here.
```

## Local development

Requirements: Node.js 22 or newer.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

`npm run start` serves the exported `out/` directory for a local production
preview.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml`. Every push to `main`
builds and deploys the static application to:

```text
https://hamzeen.github.io/dev-notes/
```

In the GitHub repository, open **Settings → Pages** and set **Source** to
**GitHub Actions** once. After that, pushes to `main` deploy automatically.

The `/dev-notes` base path is enabled only in GitHub Actions. Local development
continues to use `http://localhost:3000/`.

The `prebuild` script scans all content and generates:

- `generated/search-index.json`
- `generated/keyword.json`
- `generated/sections.json`
- `generated/documents.json`

Commit these generated files so the repository remains reproducible and easy to inspect.

## GitHub

Extract the ZIP, create a new GitHub repository, then push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
