---
title: Philosophy
slug: design-philosophy
date: 2026-08-12
author: Hamzeen Hameem
category: Architecture
summary: A quick reference for common design patterns, SOLID principles, and architecture documents.
keywords: [SOLID, best practices, RFC, ADR, sdd]
---

### SOLID Principles

| Principle and Meaning     | Practical Example                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Single Responsibility** | A class should have one responsibility and one reason to change. Decouple order processing, payment and email notification services.                                           |
| **Open/Closed**           | Code should be open for extension but closed for modification.                                                                                                                 |
| **Liskov Substitution**   | A subtype should safely replace its parent type without breaking expected behavior. Any `PaymentProcessor` implementation should work wherever `PaymentProcessor` is expected. |
| **Interface Segregation** | Prefer small, focused interfaces over large interfaces with unused methods. Split `Worker` into `Workable` and `Eatable` so a robot does not implement `eat()`.                |
| **Dependency Inversion**  | Depend on abstractions rather than concrete implementations. `OrderService` depends on `PaymentProcessor`, not directly on `StripePaymentProcessor`.                           |

### Best Practices

- Clear Separation of Concern
- Avoid Property Drilling
- Check Lighthouse, follow WCAG 2.1

### Architecture Documents

| Document | Expansion                    | Purpose                                                                                       |
| -------- | ---------------------------- | --------------------------------------------------------------------------------------------- |
| RFC      | Request for Comments         | Proposes a significant technical change and gathers feedback before implementation.           |
| ADR      | Architecture Decision Record | Records an architectural decision, its context, considered alternatives, and consequences.    |
| SDD      | Software Design Document     | Describes the system design, components, data flows, interfaces, and implementation approach. |
