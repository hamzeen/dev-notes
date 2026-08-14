---
title: Design Patterns
slug: design-patterns
date: 2026-08-14
author: Hamzeen Hameem
category: Architecture
summary: Practical examples of common software design patterns.
keywords: [design patterns, singleton, adapter, decorator, solid, rfc, adr, sdd]
---

### Singleton Pattern

Ensures only one instance of a class exists. Eager initialization is thread-safe because the JVM creates the instance during class loading.

```java
public class AppConfig {
    private static final AppConfig INSTANCE = new AppConfig();
    private AppConfig() {}

    public static AppConfig getInstance() {
        return INSTANCE;
    }
}
```

### Builder Pattern

constructs complex objects step by step, especially when they contain many optional field / config choices.
Each method sets an optional field and returns the builder; `build()` creates the final `User` object.

```java
User user = new User.Builder("Hamzeen")
    .email("hamzeen@example.com")
    .phone("+94 77 123 4567")
    .address("Colombo")
    .build();
```

### Adapter Pattern

Wraps an incompatible class so it can be used through the interface expected by the application.

```java
interface PaymentGateway {
    void pay(double amount);
}

class StripeAdapter implements PaymentGateway {
    private final StripeClient stripe = new StripeClient();

    public void pay(double amount) {
        stripe.createCharge(amount);
    }
}

PaymentGateway gateway = new StripeAdapter();
gateway.pay(100.00);
```
