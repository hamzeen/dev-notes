---
title: JavaScript Concepts
slug: javascript
date: 2026-08-12
author: Hamzeen Hameem
category: Frontend
summary: Core JavaScript concepts for quick technical discussions.
keywords: [javascript, closure, scope, event loop, arrow functions]
---

### Closures

A closure is a function that remembers variables from its lexical scope, even after the outer function has finished running.

```js
function createCounter() {
    let count = 0;
    return () => ++count;
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

Common uses include data privacy, function factories, callbacks, and preserving state without global variables.

### Event Loop

The event loop moves queued callbacks onto the call stack when the stack is empty. Promise callbacks in the microtask queue run before timer callbacks in the task queue.

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

process.nextTick(() => {
    console.log("D");
});

console.log("E");
```

Output:

```text
A E D C B
```

Execution order:

1. Synchronous code runs first → `A`, `E`
2. `process.nextTick` runs before Promise microtasks → `D`
3. The Promise microtask runs → `C`
4. The timer macrotask runs → `B`

### Variable Scope: var, let and const

`var` is function-scoped, while `let` and `const` are block-scoped. Prefer `const`, then use `let` only when reassignment is required.
