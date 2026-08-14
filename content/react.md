---
title: React Concepts
slug: react
date: 2026-08-12
author: Hamzeen Hameem
category: Frontend
summary: React concepts and common template patterns.
keywords: [react, conditional rendering, map, lists, abort controller, suspense, templates]
---

### Reconcilitation

compares the new Virtual DOM with the previous Virtual DOM to determine what changed. React then updates only necessary parts of the real DOM, after which the browser handles layout/painting as needed.

### AbortController

`AbortController` cancels an in-flight request when a component unmounts or a newer request starts.

```tsx
useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/users?q=${query}`, { signal: controller.signal })
        .then((response) => response.json())
        .then(setUsers)
        .catch((error) => {
            if (error.name !== "AbortError") throw error;
        });

    return () => controller.abort();
}, [query]);
```

### Suspense

`Suspense` displays fallback UI while a Suspense-enabled component or data source is waiting. It works with features such as `lazy` and framework-supported data fetching, but it does not automatically track ordinary requests made inside `useEffect`.

```tsx
<Suspense fallback={<p>Loading...</p>}>
    <UserProfile />
</Suspense>
```

### Higher-Order Component (HOC)

a function that takes a React component and returns an enhanced component with additional behavior or props.

### Conditional Rendering

Use an early return for substantially different screens, a ternary for either/or UI, and `&&` when an element should render only when a condition is true.

```sh
if (!user) return <Login />;

return (
  <>
    {isAdmin ? <AdminPanel /> : <UserPanel />}
    {hasNotifications && <Notifications />}
  </>
);
```

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
