---
title: Solutions Architecture
slug: solutions-architecture
date: 2026-08-13
author: Hamzeen Hameem
category: Architecture
summary: Quick-reference notes for common solutions architecture patterns including repository layers, scaling, transactional outbox, event-driven backends, SSE, webhooks, and message brokers.
keywords:
    - solutions architecture
    - repository pattern
    - vertical scaling
    - horizontal scaling
    - transactional outbox
    - event driven architecture
    - sse
    - webhooks
    - message brokers
    - load balancing
    - rate limiting
---

### Repository Pattern

Separates business logic from data-access logic so persistence concerns stay isolated behind repositories.

```text
Controller  →  Service  →  Repository  →  Database
```

- **Controller** — receives the request and returns the response.
- **Service** — contains business logic and transaction boundaries.
- **Repository** — handles database queries and persistence.

### Vertical Scaling

Vertical scaling means increasing the capacity of a single application instance.

- Add more CPU or memory to the machine/container.
- Use **worker threads** when CPU-intensive work can run in parallel.
- Tune **database connection pool size** so the application can handle more concurrent DB operations without overwhelming the database.
- It is simple to operate, but eventually reaches the limits of one machine.

```text
Single Instance
      ↓
More CPU / RAM
      ↓
Workers / Larger Connection Pool
```

### Horizontal Scaling

Horizontal scaling means adding or removing application instances instead of making one machine larger.

- Cloud/serverless platforms such as **AWS Lambda** can expand and shrink compute capacity based on demand.
- A **load balancer** distributes incoming traffic across multiple instances.
- **Round Robin** sends requests across instances in sequence.
- **Weighted Round Robin** sends more requests to instances with greater assigned capacity.
- Horizontal scaling improves capacity and resilience, but applications should generally avoid relying on local instance state.

```text
                    ┌→ Instance A
Client → Load Balancer → Instance B
                    └→ Instance C
```

### Transactional Outbox

The Transactional Outbox pattern stores the database change and an outgoing event in the **same database transaction**. A separate publisher later reads the outbox and sends the event to the message broker, avoiding the dual-write problem. This provides reliable eventual delivery without requiring the database and broker to participate in one distributed transaction.

```text
Application
    ↓
Database Transaction
    ├→ Business Data
    └→ Outbox Event
            ↓
        Publisher
            ↓
      Message Broker
```

### Event-Driven Backends

An event-driven backend reacts to events instead of requiring every component to communicate through synchronous request/response calls. Producers emit events and interested consumers react asynchronously, reducing coupling between components.

Common options:

| Option          | Typical use                            |
| --------------- | -------------------------------------- |
| SSE             | Server → browser real-time updates     |
| Webhooks        | Server → external server notifications |
| WebSockets      | Bidirectional real-time communication  |
| Polling         | Client repeatedly checks for updates   |
| Message Brokers | Asynchronous service-to-service events |

### Server-Sent Events (SSE)

SSE keeps an HTTP connection open so the server can continuously push events to the browser.

```text
Browser  ←──── continuous events ────  Server
```

Good for **one-way server → client** updates such as:

- Job progress
- Notifications
- Live status updates
- Processing progress

The browser provides the native `EventSource` API:

```js
const events = new EventSource("/events");

events.onmessage = (event) => {
    console.log(event.data);
};
```

### Webhooks

Webhooks allow one backend to notify another backend when an event occurs by sending an HTTP request to a registered callback URL. In an event-driven architecture, they are useful when the event consumer is an **external system** rather than an internal service connected through a broker.

```text
Event occurs
    ↓
Your Backend
    ↓ HTTP POST
External Backend
```

### Message Brokers

A message broker sits between producers and consumers and transports messages or events asynchronously.

```text
Producer  →  Message Broker  →  Consumer
```

This decouples services because producers do not need to know when, where, or how quickly consumers process an event.

Typical capabilities include:

- Queues and topics
- Message durability
- Retry and dead-letter handling
- Multiple consumers
- Asynchronous processing
- Traffic buffering during spikes

Common technologies:

| Technology   | Common fit                                           |
| ------------ | ---------------------------------------------------- |
| RabbitMQ     | Queues, routing, work distribution                   |
| Apache Kafka | High-throughput event streams and durable event logs |
| AWS SQS      | Managed cloud message queues                         |
| AWS SNS      | Managed publish/subscribe notifications              |

A common event-driven flow:

```text
Service A
   ↓
Publish Event
   ↓
Message Broker
   ├→ Service B
   ├→ Service C
   └→ Worker
```

### Rate Limiting

how many requests a client can make within a given period ? it protects the service from abuse and traffic spikes.

**Bucket4j** implements the **Token Bucket algorithm**: tokens are added to a bucket at a configured rate, and each request consumes a token. If no tokens remain, the request is rejected or delayed. Bucket can hold extra tokens, allowing a controlled **traffic burst** while still enforcing long-term request rate.
Other algorithms include leaky bucket, fixed window, and sliding window.

```text
Tokens refill
     ↓
[ Token Bucket ] ← Client Request
     ↓ consume token
 Application

No token → 429 Too Many Requests
```
