---
title: "DB Transaction"
slug: "db-transaction"
date: 2026-08-13
author: Hamzeen Hameem
category: "Backend"
summary: "A concise note on database transactions, COMMIT, ROLLBACK, and atomic multi-query operations."
keywords:
    - database
    - sql
    - transaction
    - commit
    - rollback
    - atomicity
---

### The Flow

A **database transaction** groups multiple queries into a single unit of work.

```text
BEGIN
  Query 1
  Query 2
  ├─ Both succeed → COMMIT
  └─ Any fails    → ROLLBACK
```

The key idea is **all or nothing**:

- `BEGIN` starts the transaction.
- `COMMIT` permanently saves all changes.
- `ROLLBACK` cancels all changes made inside the transaction if something fails.

### Example: Bank Transfer

Suppose Alice transfers **$100** to Bob.

Two database changes must happen together:

- Remove $100 from Alice's account; Add $100 to Bob's account.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

COMMIT;
```

If both `UPDATE` queries succeed, the transaction is committed.

If either query fails, the application or database transaction handler should execute:

```sql
ROLLBACK;
```

This prevents situations where money is removed from Alice's account but never added to Bob's account.

### Why Transactions Matter

Without a transaction:

```text
Alice -$100   ✅
Bob   +$100   ❌

Database is now inconsistent.
```

With a transaction:

```text
Alice -$100   ✅
Bob   +$100   ✅
             ↓
           COMMIT
```

```text
Alice -$100   ✅
Bob   +$100   ❌
             ↓
          ROLLBACK

Neither change is saved.
```

### Core Property

This behavior is the **Atomicity** part of ACID:

> Either every operation in the transaction succeeds, or none of them are applied.
