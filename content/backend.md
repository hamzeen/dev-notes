---
title: Backend Architecture
slug: backend
date: 2026-08-12
author: Hamzeen Hameem
category: Backend
summary: Practical backend architecture patterns and trade-offs.
keywords:
    [backend, caching, idempotency, N+1 query, thread safety, race conditions, pessimistic locking]
---

### Idempotency

Retries can cause the same request to be processed more than once, creating duplicate payments, orders, or bookings. Idempotency ensures repeated requests have the same effect as a single request.

**Scenario:** A payment request succeeds, but the response is lost and the client retries.

**Solution:** The client sends a unique idempotency key in the request header. The server stores the result for that key and returns the same result when the request is retried.

```http
POST /api/payments HTTP/1.1
Content-Type: application/json
Idempotency-Key: payment-8f47c2a1

{
  "orderId": 42,
  "amount": 100.00
}
```

### N+1 Query Problem

The N+1 problem occurs when one query loads a list of parent records and then an additional query runs for every parent. This increases database round trips as the result set grows.

**Scenario:** One query loads all customers, followed by one query per customer to load their orders.

**Solution:** Fetch the customers and their orders in a single query using a join.

```sql
SELECT
  customers.id,
  customers.name,
  orders.id AS order_id,
  orders.product
FROM customers
LEFT JOIN orders
  ON orders.customer_id = customers.id;
```

### Race Condition: Pessimistic Locking

A race condition occurs when concurrent requests read the same state and attempt conflicting updates. Without protection, both requests may appear valid and create an incorrect result.

**Scenario:** Two passengers try to book the last available seat on the same flight at the same time.

**Solution:** Lock the seat row inside a transaction so only one request can check and reserve it at a time.

```sql
BEGIN;

SELECT id, status
FROM flight_seats
WHERE flight_id = 101 AND seat_number = '12A'
FOR UPDATE;

UPDATE flight_seats
SET status = 'BOOKED', passenger_id = 501
WHERE flight_id = 101
  AND seat_number = '12A'
  AND status = 'AVAILABLE';

COMMIT;
```

### Caching Strategies

Cache-aside keeps application code in control: read the cache first, load from the source on a miss, and then populate the cache. Always define expiry and invalidation behavior.

In a Spring backend, multiple Tomcat threads can access the cache concurrently. Use `ConcurrentHashMap` instead of a plain `HashMap` to make these concurrent cache operations thread-safe.

```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

public class ApiCache<T> {

    private final Map<String, T> cache = new ConcurrentHashMap<>();

    public T get(String key, Supplier<T> apiCall) {
        return cache.computeIfAbsent(key, k -> apiCall.get());
    }

    public void clear() {
        cache.clear();
    }
}
```

Usage:

```java
ApiCache<Movie> cache = new ApiCache<>();

Movie movie = cache.get("movie-123", () -> movieApi.getMovie("123"));
```

Flow:

```text
Request
   ↓
cache.get("movie-123")
   ↓
Exists? ── Yes → Return cached value
   │
   No
   ↓
Call external API
   ↓
Store response in ConcurrentHashMap
   ↓
Return response
```

The key line is:

```java
cache.computeIfAbsent(key, k -> apiCall.get());
```

Repeated requests for the same key can reuse the cached response. In production, add a TTL and maximum cache size or use Caffeine because this simple map can otherwise grow indefinitely.
