---
title: JVM Internals
slug: jvm-flow
date: 2026-08-14
author: Hamzeen Hameem
category: Java/Spring Boot
summary: A simple step-by-step flow of how Java source code moves through the JVM until execution.
keywords: [jvm, java, bytecode, class loader, jit, garbage collection, kotlin, backend]
---

### JVM Compilers

| Compiler  | Source file |
| --------- | ----------- |
| `kotlinc` | `.kt`       |
| `javac`   | `.java`     |

### var — Local Type Inference

var lets the compiler infer a local variable’s type from its initializer. It remains statically typed.

```java
var name = "Hamzeen"; // Inferred as String

var value = 10;   // Inferred as int
value = "ten";  // Compile error
```

| Be careful with                  | Why                                            |
| -------------------------------- | ---------------------------------------------- |
| `var result = process();`        | Type is hidden; readability suffers            |
| `var items = new ArrayList<>();` | Infers `ArrayList<Object>`; specify `<String>` |
| `var value = null;`              | Cannot infer a type                            |
| Fields, parameters, return types | `var` cannot replace their declared types      |

**Remember**: Use var when the type is obvious, explicit types when it isn’t.

### Structural vs Non-Structural Modification

| Aspect               | Structural                                       | Non-structural                                       |
| -------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| **Change**           | Adds/removes entries; may resize backing storage | Replaces an existing value                           |
| **Examples**         | `add()`, `remove()`, `put(newKey, value)`        | `ArrayList.set()`, `HashMap.put(existingKey, value)` |
| **`modCount`**       | Typically incremented                            | Unchanged for these examples                         |
| **Iterator impact**  | May throw `ConcurrentModificationException`      | These updates don’t invalidate iterators             |
| **During traversal** | Use `iterator.remove()` to remove safely         | Existing values can be updated                       |

```java
List<String> names = new ArrayList<>(List.of("Ann", "Bob"));

// Non-structural: replaces an existing element
names.set(0, "Anna");

// Structural, but safe through this iterator
Iterator<String> iterator = names.iterator();
while (iterator.hasNext()) {
    if (iterator.next().equals("Bob")) {
        iterator.remove();
    }
}
```

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
