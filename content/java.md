---
title: Java Internals
slug: jvm-flow
date: 2026-08-14
author: Hamzeen Hameem
category: Backend
summary: A simple step-by-step flow of how Java source code moves through the JVM until execution.
keywords: [jvm, java, bytecode, class loader, jit, garbage collection, kotlin, backend]
---

### JVM Compilers

| Compiler  | Source file |
| --------- | ----------- |
| `kotlinc` | `.kt`       |
| `javac`   | `.java`     |

### JVM Execution Flow

A Java program is compiled into bytecode, then the JVM loads, verifies, initializes, and executes it.

```text
Java Source Code (.java)
   ↓
javac compiles it into JVM bytecode (.class)
   ↓
1.Class Loading
   ↓
2.Verification
  (JVM verifies that the bytecode is valid, safe, and follows JVM rules)
   ↓
3.Class Preparation
  (Static fields are allocated and assigned default values)
   ↓
4.Class Initialization
  (Static initializers and explicit static values are executed)
   ↓
5.Main Method Lookup
  (JVM locates: public static void main())
   ↓
6.Execution
  (JVM executes bytecode using the interpreter)
   ↓
7.Runtime Services
  (while app runs: VM manages stack frames, heap objs, method calls, memory, GC)
```
