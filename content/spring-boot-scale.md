---
title: Scalability
slug: spring-boot-request-capacity
date: 2026-08-14
author: Hamzeen Hameem
category: Backend
summary: A practical method for benchmarking and vertically scaling a single Spring Boot instance.
keywords:
    [
        spring boot,
        request capacity,
        load testing,
        vertical scaling,
        tomcat,
        hikariCP,
        database connection pool,
        throughput,
        latency,
        autocannon,
    ]
---

### Establish the Current Target

Assume the Quiz Builder backend should initially handle `5,000 requests per minute`.

```text
Requests per second
= 5,000 ÷ 60
≈ 83 RPS
```

Use the slowest representative operation, such as loading a published quiz with its questions and answers. Assume the complete request takes `200 ms`, including application logic, database work, mapping and serialization.

```text
Required Concurrency
= RPS × request duration in seconds
= 83 × 0.2
≈ 17 concurrent requests
```

Tomcat therefore needs at least approximately `17` workers. Its cap is around `200`.

### Estimate Database Connections

The request may take `200 ms` overall but hold a database connection for only part of that time. Assume the worst representative request holds a connection for `50 ms`.

```text
Required database connections
= RPS × connection-hold time in seconds
= 83 × 0.05
≈ 4.15 connections
```

A HikariCP pool of `10` connections could theoretically cover this concurrency. A larger pool should be introduced only when monitoring shows that requests are waiting for connections and the database can accept more work.

These calculations show that `5,000 requests per minute` is plausible; they do not prove that the backend can sustain it.

### Load-Test the Current Backend

Run the Spring Boot application in a production-like environment and gradually increase concurrent traffic.

```bash
autocannon -c 100 -d 30 http://localhost:8080/api/quizzes/example
```

Record the following:

- Requests per second
- p95 and p99 response latency
- Error and timeout rates
- CPU, memory and garbage collection
- Busy Tomcat threads
- Active and pending Hikari connections
- Database CPU and slow queries

The practical capacity limit is reached when latency, errors, or resource usage becomes unacceptable—not simply at the highest observed RPS.

### Find the Bottleneck

```text
High CPU                 → optimize code or add CPU cores
Tomcat threads saturated → increase worker threads carefully
Hikari pool exhausted    → optimize queries, then review the pool size
Slow database queries    → add indexes, improve joins or remove N+1 queries
Repeated read requests   → cache published quizzes
High memory or GC        → reduce allocations or increase heap if justified
```

### Calculate the Larger Target

To scale the same instance toward `20,000 requests per minute`:

```text
20,000 ÷ 60 ≈ 333 RPS

Required Concurrency
= 333 × 0.2
≈ 67 Tomcat threads

Required database connections
= 333 × 0.05
≈ 16.65 connections
```

This suggests that approximately `67` simultaneously active request threads and `17` busy database connections may be required under these assumptions. Use headroom rather than configuring exactly at the calculated limit—for example, `150` Tomcat threads and a Hikari pool of `25`.

### Vertically Scale the Backend

1. Optimize the slowest queries and remove N+1 queries.
2. Cache safe, read-heavy operations such as retrieving published quizzes.
3. Increase CPU and memory where monitoring shows saturation.
4. Tune Tomcat worker threads for the required concurrency.
5. Tune HikariCP without exceeding the database's connection capacity.
6. Repeat the same load test and compare p95 latency, errors and resource usage.

### Spring Boot Configuration

```yaml
server:
    tomcat:
        threads:
            max: 150
            min-spare: 20
        accept-count: 100

spring:
    datasource:
        hikari:
            maximum-pool-size: 25
            minimum-idle: 10
            connection-timeout: 3000
```

### Interview Approach

> Convert the target to RPS, calculate thread demand from the complete request time, and calculate connection demand from the database connection-hold time. Then load-test the most expensive representative requests, tune the observed bottleneck, and test again. To support 20,000 requests per minute, the instance must sustain approximately 333 RPS within the agreed latency and error limits.
