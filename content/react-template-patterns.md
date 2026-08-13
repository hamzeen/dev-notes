---
title: "react template patterns"
slug: react-template-patterns
date: 2026-08-13
author: Hamzeen Hameem
category: "Frontend"
summary: Common React JSX template patterns for conditional rendering, lists, fallbacks, props, and CSS classes.
keywords: [react, jsx, template patterns, conditional rendering, map, lists]
---

### Pattern Overview

| # | Pattern | Typical Usage |
|---|---|---|
| 1 | `if / else` | Render completely different UI branches |
| 2 | Ternary `? :` | Inline if/else rendering |
| 3 | Logical AND `&&` | Render something only when a condition is true |
| 4 | `map()` | Iterate an array and construct JSX |
| 5 | `filter().map()` | Filter an array, then render matching items |
| 6 | `switch` | Render based on multiple possible states |
| 7 | Early return | Stop rendering and return a specific UI |
| 8 | Fallback `??` / `||` | Display a default value |
| 9 | Optional chaining `?.` | Safely access nested values |
| 10 | Conditional props | Change props based on a condition |
| 11 | Conditional classes | Change CSS classes dynamically |

### 1. If / Else

Useful when the whole component should return different UI.

```jsx
if (isLoading) {
  return <p>Loading...</p>;
} else {
  return <p>Loaded</p>;
}
```

### 2. Ternary

Inline version of `if / else`.

```jsx
{isLoggedIn
  ? <Dashboard />
  : <Login />
}
```

### 3. Logical AND `&&`

Render something only when a condition is true.

```jsx
{errors.length > 0 && (
  <p>There are errors</p>
)}
```

If the condition is false, nothing is rendered.

### 4. `map()` — Array Iteration

Very common for generating JSX from arrays.

```jsx
{todos.map((todo) => (
  <p key={todo.id}>
    {todo.name}
  </p>
))}
```

Conceptually:

```text
for each todo
    construct <p>
```

### 5. `filter().map()`

Filter items first, then construct JSX.

```jsx
{todos
  .filter((todo) => todo.status === "COMPLETE")
  .map((todo) => (
    <p key={todo.id}>
      {todo.name}
    </p>
  ))}
```

Conceptually:

```text
find completed todos
for each completed todo
    construct <p>
```

### 6. `switch`

Useful when there are several possible states.

```jsx
switch (status) {
  case "LOADING":
    return <p>Loading...</p>;

  case "ERROR":
    return <p>Error</p>;

  case "SUCCESS":
    return <Results />;

  default:
    return null;
}
```

Common with states such as:

```text
IDLE
LOADING
SUCCESS
ERROR
```

### 7. Early Return

Useful for handling special states before the main JSX.

```jsx
if (!user) {
  return <Login />;
}

return (
  <Dashboard />
);
```

Another common example:

```jsx
if (loading) {
  return <Spinner />;
}

if (error) {
  return <ErrorMessage />;
}

return <Results />;
```

### 8. Fallback `??` / `||`

Display a default value if something is missing.

```jsx
<p>{user.name ?? "Guest"}</p>
```

Or:

```jsx
<p>{username || "Guest"}</p>
```

`??` is usually safer when `0`, `false`, or `""` are valid values.

### 9. Optional Chaining `?.`

Safely access data that might not exist yet.

```jsx
<p>{user?.profile?.name}</p>
```

Instead of risking:

```jsx
user.profile.name
```

when `user` or `profile` might be undefined.

Very common with API data:

```jsx
{quiz?.questions?.map((question) => (
  <p key={question.id}>
    {question.text}
  </p>
))}
```

### 10. Conditional Props

Change component or HTML properties dynamically.

```jsx
<button disabled={loading}>
  Save
</button>
```

Another example:

```jsx
<input
  checked={todo.completed}
  readOnly
/>
```

Or:

```jsx
<Button
  variant={isActive ? "primary" : "secondary"}
/>
```

### 11. Conditional Classes

Apply CSS based on state.

```jsx
<div className={isActive ? "active" : "inactive"}>
  Item
</div>
```

Or a commonly used pattern:

```jsx
<button
  className={`button ${selected ? "selected" : ""}`}
>
  Select
</button>
```

### Quick Recall

```text
1. if / else
2. ternary
3. &&
4. map()
5. filter().map()
6. switch
7. early return
8. fallback
9. optional chaining
10. conditional props
11. conditional classes
```

The first **7** are mainly rendering and control-flow patterns, while **8–11** are common JSX data and attribute patterns.
