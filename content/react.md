---
title: React Concepts
slug: react
date: 2026-08-12
author: Hamzeen Hameem
category: Frontend
summary: React concepts and common template patterns.
keywords: [react, conditional rendering, map, lists, templates]
---

### Conditional Rendering

Use an early return for substantially different screens, a ternary for either/or UI, and `&&` when an element should render only when a condition is true.

### Rendering Lists with map

Use `map` to transform data into elements. Give every sibling a stable key based on its identity, not its array position when the list can change.

```sh
    {products.map((product) => (
        <article key={product.id} className="mx-auto bg-white">
            {/* product content */}
        </article>
    ))}
```

### Frontend API Caching

Client-side caching avoids repeated API requests for data that is still fresh. Libraries such as Apollo Client or TanStack Query can cache responses, deduplicate requests, and refetch stale data.
