---
title: Tools
slug: tools
date: 2026-08-13
author: Hamzeen Hameem
category: Tools
summary: Quick-reference notes for common frontend and development tools including Axios, Lighthouse accessibility checks, ESLint, Prettier, Autocannon, and Vite proxy configuration.
keywords:
    - axios
    - lighthouse
    - wcag
    - eslint
    - prettier
    - autocannon
    - vite
    - proxy
    - frontend tools
    - tanstack query
    - zod
    - valibot
    - zustand
    - redux toolkit
    - state management
    - validation
---

### Axios

Axios is an HTTP client commonly used to call APIs from frontend or Node.js applications.

```js
import axios from "axios";

const response = await axios.get("/api/users");
console.log(response.data);
```

POST request:

```js
await axios.post("/api/users", {
    name: "Alice",
    email: "alice@example.com",
});
```

Create a reusable client:

```js
const api = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

const response = await api.get("/users");
```

Interceptor example:

```js
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

### WCAG 2.1 and Lighthouse

WCAG defines accessibility guidelines for web applications.

The four main principles are:

| Principle      | Meaning                                         |
| -------------- | ----------------------------------------------- |
| Perceivable    | Users must be able to perceive the content      |
| Operable       | UI must be usable with different input methods  |
| Understandable | Content and interactions should be clear        |
| Robust         | Content should work with assistive technologies |

Common checks:

- Color contrast
- Keyboard navigation
- Form labels
- Image `alt` text
- Semantic HTML
- Accessible names for buttons and links

Chrome Lighthouse can run an automated accessibility audit:

```text
Chrome DevTools → Lighthouse → Accessibility → Analyze page load
```

Lighthouse is useful for finding common accessibility problems, but manual keyboard and screen-reader testing is still important.

### ESLint

ESLint analyzes JavaScript/TypeScript code and reports code-quality or correctness issues.

```bash
npm run lint
```

Example rule:

```js
export default [
    {
        rules: {
            "no-unused-vars": "warn",
        },
    },
];
```

Typical use:

```text
ESLint = catches problems in code
```

### Prettier

Prettier automatically formats code consistently.
Eslint and Prettier are commonly used together. command, conf & usage below.

```bash
npx prettier . --write
```

```json
{
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2
}
```

```text
Prettier = formatting
ESLint   = code quality / correctness
```

### Autocannon

Autocannon is a Node.js HTTP benchmarking tool useful for basic load and performance testing.

Install:

```bash
npm install -g autocannon
```

Run a simple test:

```bash
autocannon http://localhost:8080/api/users
```

Specify connections and duration:

```bash
autocannon -c 100 -d 20 http://localhost:8080/api/users
```

Where:

```text
-c 100  → 100 concurrent connections
-d 20   → run for 20 seconds
```

Useful output includes:

- Requests per second
- Latency
- Throughput
- Errors/timeouts

### Vite Proxy Configuration

A Vite development proxy lets the frontend call the backend without hardcoding the backend URL throughout the application.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
        },
    },
});
```

Frontend code can then use:

```js
fetch("/api/users");
```

instead of:

```js
fetch("http://localhost:8080/api/users");
```

Request flow:

```text
Browser
  ↓
/api/users
  ↓
Vite dev server
  ↓
http://localhost:8080/api/users
```

This keeps frontend API calls cleaner during local development.

### TanStack Query

TanStack Query manages **server state** in frontend applications: fetching, caching, refetching, loading states, and request synchronization.

```tsx
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
});
```

A `queryKey` identifies cached data:

```tsx
useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
});
```

Quick rule:

```text
TanStack Query → server/API state
Zustand / Redux → client/application state
```

### Zod / Valibot

Both Zod and Valibot provide runtime schema validation with TypeScript support.

#### Zod

```ts
import { z } from "zod";

const UserSchema = z.object({
    name: z.string(),
    email: z.email(),
    age: z.number().min(18),
});

const user = UserSchema.parse(input);
```

Use `safeParse()` when validation failure should be handled without throwing:

```ts
const result = UserSchema.safeParse(input);

if (!result.success) {
    console.log(result.error);
}
```

Regular Zod uses a method-heavy API that is **difficult to tree-shake effectively**, so unused functionality may still contribute to the bundle.

Zod also provides **Zod Mini**, a more functional, tree-shakable variant for bundle-size-sensitive applications.

#### Valibot

Valibot uses a modular API designed for **tree shaking**, allowing bundlers to remove validators and actions that are not used.

```ts
import * as v from "valibot";

const UserSchema = v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
    age: v.pipe(v.number(), v.minValue(18)),
});

const user = v.parse(UserSchema, input);
```

Quick comparison:

| Library  | Tree shaking             | Main idea                              |
| -------- | ------------------------ | -------------------------------------- |
| Zod      | Limited with regular Zod | Simple, method-based schema API        |
| Zod Mini | Yes                      | Tree-shakable Zod variant              |
| Valibot  | Yes                      | Modular API designed for small bundles |

Common use cases:

- Form validation
- API response validation
- Environment variable validation
- Shared frontend/backend schemas

### Zustand

Zustand is a lightweight state-management library for shared client state.

```ts
import { create } from "zustand";

const useCounterStore = create((set) => ({
    count: 0,
    increment: () =>
        set((state) => ({
            count: state.count + 1,
        })),
}));
```

Use in a component:

```tsx
const count = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);
```

Good fit for relatively simple global state without much boilerplate.

### Redux Toolkit

Redux Toolkit is the recommended modern approach for writing Redux applications.

```ts
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
});

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});

export const { increment } = counterSlice.actions;
```

Quick comparison:

| Tool           | Best suited for                        |
| -------------- | -------------------------------------- |
| TanStack Query | Server/API state and caching           |
| Zustand        | Lightweight shared client state        |
| Redux Toolkit  | Larger or more structured client state |
| Zod            | Runtime validation and schemas         |

### Useful CLI Commands

| Tool               | Command                            |
| ------------------ | ---------------------------------- |
| ESLint             | `npm run lint`                     |
| Prettier           | `npx prettier . --write`           |
| Autocannon         | `autocannon http://localhost:8080` |
| Vite               | `npm run dev`                      |
| TypeScript         | `npx tsc --noEmit`                 |
| npm security audit | `npm audit`                        |
