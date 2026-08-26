---
title: TypeScript
slug: typescript
date: 2026-08-26
author: Hamzeen Hameem
category: Frontend
summary: A quick reference to key TypeScript features.
keywords: [typescript, generics, conditional types, mapped types, utility types, types, interfaces]
---

### Features

- **Generics**
- **Conditional Types**
- **Mapped Types**
- **Utility Types**
- **Types & Interfaces**

### Utility Types — `Partial`

```typescript
type User = { name: string; email: string };

const update: Partial<User> = { name: "Hamzeen" };
```

### Union Type

```typescript
const id: string | number = 101;
```

### Intersection Type

```typescript
type Person = { name: string };
type Employee = { empId: number };
type Staff = Person & Employee;
const st101: Staff = {
    name: "Haland",
    empId: 101,
};
```
