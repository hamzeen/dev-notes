---
title: RxJS
slug: rxjs
date: 2026-08-14
author: Hamzeen Hameem
category: Frontend
summary: Common RxJS operators and when to use them.
keywords: [rxjs, operators, switchMap, concatMap, exhaustMap, observables]
---

### RxJS Operators

| Operator     | Usage                                                                |
| ------------ | -------------------------------------------------------------------- |
| `switchMap`  | Cancel the previous request when a new one starts; ideal for search. |
| `concatMap`  | Run multiple requests one by one when order matters.                 |
| `exhaustMap` | Ignore repeated submissions while the current request is running.    |
