---
title: Design and Architecture Notes
slug: design-and-architecture
date: 2026-08-12
author: Hamzeen Hameem
category: Architecture
summary: A quick reference for common design patterns, SOLID principles, and architecture documents.
keywords: [design patterns, singleton, factory method, builder, adapter, decorator, solid, rfc, adr, sdd]
---

### Design Patterns

| Pattern | Purpose |
| --- | --- |
| Singleton | Ensures a class has only one instance and provides a global access point to it. |
| Factory Method | Defines an interface for creating objects while allowing subclasses or implementations to decide which concrete object to create. |
| Builder | Constructs a complex object step by step, separating its construction from its final representation. |
| Adapter | Converts one interface into another interface that the client expects, allowing incompatible components to work together. |
| Decorator | Adds behavior to an object dynamically without modifying its original class. |

### SOLID Principles

| Principle | Meaning |
| --- | --- |
| **S — Single Responsibility Principle** | A class or module should have one responsibility and therefore one reason to change. |
| **O — Open/Closed Principle** | Software entities should be open for extension but closed for modification. |
| **L — Liskov Substitution Principle** | A child type should be usable wherever its parent type is expected without breaking correctness. |
| **I — Interface Segregation Principle** | Clients should not be forced to depend on methods or interfaces they do not use. Prefer small, focused interfaces. |
| **D — Dependency Inversion Principle** | High-level and low-level modules should depend on abstractions rather than concrete implementations. |

### Architecture Documents

| Document | Expansion | Purpose |
| --- | --- | --- |
| RFC | Request for Comments | Proposes a significant technical change and gathers feedback before implementation. |
| ADR | Architecture Decision Record | Records an architectural decision, its context, considered alternatives, and consequences. |
| SDD | Software Design Document | Describes the system design, components, data flows, interfaces, and implementation approach. |
