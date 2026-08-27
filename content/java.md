---
title: Java
slug: java
date: 2026-08-27
author: Hamzeen Hameem
category: Java/Spring Boot
summary: Quick-reference Java concepts and common interview questions.
keywords:
    [
        java,
        hashmap,
        concurrenthashmap,
        circuit breaker,
        repository pattern,
        virtual threads,
        completablefuture,
        final,
        finally,
        n+1,
    ]
---

### `final` vs `finally`

- `final` — value cannot change / method cannot override / class cannot extend.
- `finally` — block that runs after `try/catch`, usually for cleanup.

### `@Component` vs `@Controller`

- Technically, `@Component` can be interchanged with `@Service` & `@Controller`, they're both specialized versions of the base `@Component` annotation.

- Not interchangeable in **intent**: use `@Controller` for request handling.

### HashMap vs ConcurrentHashMap

|                   | `HashMap`                         | `ConcurrentHashMap`    |
| :---------------- | :-------------------------------- | :--------------------- |
| **Thread safety** | No                                | Yes                    |
| **Null values**   | Allows one null key + null values | No null keys or values |

### Circuit Breaker Pattern

- Stops calling a **failing service** temporarily -> Prevents cascading failures & allows recovery.

### Second Highest Salary

```java
Employee result = employees.stream()
    .sorted(Comparator.comparing(Employee::getSalary).reversed())
    .skip(1)
    .findFirst()
    .orElse(null);
```

### First Non-Repeating Character

```java
String s = "Swiss".toLowerCase();

char result = s.chars()
    .mapToObj(c -> (char) c)
    .filter(c -> s.indexOf(c) == s.lastIndexOf(c))
    .findFirst().orElseThrow(); // result: => 'w'
```

### Repository Pattern

- Separates **data-access logic** from business logic.
- Service depends on a repository instead of querying the DB directly.

### CompletableFuture

- Runs async tasks without blocking the calling thread.
- Similar idea to a JavaScript `Promise`.

```java
CompletableFuture.supplyAsync(() -> loadData());
```

### Virtual Thread

- Lightweight **JVM-managed thread**.
- Useful for large numbers of blocking I/O tasks.

```java
Thread.startVirtualThread(() -> doWork());
```

### Database Optimization

- **Indexes** — speed up frequently queried columns.
- **Avoid N+1** — fetch related data efficiently, e.g. `JOIN FETCH`.
