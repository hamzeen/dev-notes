---
title: RxJS
slug: rxjs
date: 2026-08-14
author: Hamzeen Hameem
category: Angular/Typescript
summary: Common RxJS operators and when to use them.
keywords: [rxjs, operators, switchMap, concatMap, exhaustMap, observables]
---

### RxJS Operators

| Operator     | Usage                                                                |
| ------------ | -------------------------------------------------------------------- |
| `switchMap`  | Cancel the previous request when a new one starts; ideal for search. |
| `concatMap`  | Run multiple requests one by one when order matters.                 |
| `exhaustMap` | Ignore repeated submissions while the current request is running.    |

Sample Code

```ts
@Component({
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private api = inject(ApiService);
  private save$ = new Subject<void>();

  users = [
    { id: 1, name: 'Ana' },
    { id: 2, name: 'Sam' },
  ];

  constructor() {
    this.save$
      .pipe(
        exhaustMap(() => this.api.save()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  save() {
    this.save$.next();
  }
}

@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
}
<button (click)="save()">Save</button>
```

### HTTP Resource

HttpClient underneath → response state exposed as signals.

```ts
import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users = httpResource<User[]>(() => '/api/users');
}

@if (users.isLoading()) {
  <p>Loading...</p>
}

@for (user of users.value(); track user.id) {
  <p>{{ user.name }}</p>
}
```
