---
title: Angular
slug: angular
date: 2026-08-25
author: Hamzeen Hameem
category: Angular/Typescript
summary: A quick overview of Angular's purpose for building web applications.
keywords: [angular, typescript, component-based, declarative]
---

### Why Angular

- **Component-based** — builds UIs from reusable components.
- **Declarative** — keeps templates and application state in sync.
- **Complete framework** — provides routing, forms, HTTP and dependency injection.
- **MVVM architecture** — Separates the UI, presentation logic and data model.

### Constructs

- **Content Projection** build reusable layout with named slots.
  uses multi-slot content projection via <ng-content> directive.
- **Route Resolver** pre-load data before showing a page
- **Interceptors** - cost cutting concerns (logging, auth)
- `canActiviate()`, `canDeactivate()`: checks on **entering** / **leaving** a route.
- **Component Store pattern**: isolates complex local feature state, business logic & side effects outside of UI components.

- **Structural Directive**: DOM strcuture; **Attribute Directive**: appearance / behavior

- `@defer blocks`: let you delay loading heavy components and their dependencies until they are needed, reducing initial bundle sizes and improving performance metrics like Largest Contentful Paint.

```js
@defer {
  <heavy-chart />
}
```

### Angular 22

- **Signals first** — Prefer `signal()`, `computed()`, `linkedSignal()` for local/derived states

- Signals: fine grained reactivity, updates only the affected views and dependencies.
- Zone.js: Monkey-patches async browser APIs and triggers application-wide change detection automatically.

- **Selectorless** components; **Standalone** by default — NgModules are still supported for old codebases.
- **`OnPush` is now the default** — Components use `OnPush` change detection by default in Angular 22.
- **ChangeDetectorRef (CDR)** exists, but needed less — Signals notify Angular of template state changes; `markForCheck()` / `detectChanges()` for manual.

- **NgRx is no longer the default** — Simple state can often use Angular Signals; use **NgRx SignalStore** or classic NgRx Store when application state becomes complex/shared.
- **RxJS still matters, but less for component state** — Keep it for event streams, complex async flows, WebSockets and operators such as `switchMap`; Signals cover much of the simple UI-state work.
- **Less subscription cleanup** — RxJS subscriptions still need lifecycle handling with `AsyncPipe`, `takeUntilDestroyed()`, etc.; a `BehaviorSubject`
- **`httpResource()` for reactive reads** — Stable in Angular 22 and ideal for signal-driven GET/read requests. It uses `HttpClient` underneath; keep `HttpClient` for imperative calls and mutations such as POST/PUT/DELETE.
- **Signal Forms are stable** — Preferred for new signal-based forms; Reactive Forms remain fully supported and useful for existing/complex forms.
- **Zoneless by default** — Angular no longer requires Zone.js for new applications; change detection is driven more explicitly by Signals and framework notifications.
- **Signal-based component APIs** — Prefer `input()`, `output()` and `model()` over decorator-based `@Input()` / `@Output()` in new code.
- **Testing: Vitest** — Vitest is the default ng CLI unit-test runner. Jest is still possible.
- Angular CDK scrolling module - for high performance virtual scrolling (large lists).
