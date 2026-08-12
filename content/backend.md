---
title: Backend Architecture Notes
slug: backend
date: 2026-08-12
author: Hamzeen Hameem
category: Backend
summary: Practical backend architecture patterns and trade-offs.
keywords: [backend, rate limiting, caching, message brokers, kafka, rabbitmq]
---

### Rate Limiting

Rate limiting controls how many requests a client can make within a time window. Common algorithms include token bucket, leaky bucket, fixed window, and sliding window.

### Caching Strategies

Cache-aside keeps application code in control: read the cache first, load from the source on a miss, and then populate the cache. Always define expiry and invalidation behavior.

### Message Brokers

Message brokers decouple producers and consumers. Kafka suits durable event streams and replay; RabbitMQ is strong for routed work queues and per-message acknowledgements.
