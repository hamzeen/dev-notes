---
title: SQL Inner Join
slug: sql-join
date: 2026-08-13
author: Hamzeen Hameem
category: Backend
summary: A practical SQL INNER JOIN example using customers and orders, including the source tables, query, and resulting rows.
keywords:
    - sql
    - inner join
    - database
    - relational database
    - backend
---

An `INNER JOIN` combines rows from two tables and returns only the rows where the specified columns match.

### Parent Table: `customers`

|  id | name    |
| --: | ------- |
|   1 | Alice   |
|   2 | Bob     |
|   3 | Charlie |

### Child Table: `orders`

|  id | customer_id | product  |
| --: | ----------: | -------- |
| 101 |           1 | Laptop   |
| 102 |           1 | Mouse    |
| 103 |           2 | Keyboard |

### Inner Join

```sql
SELECT
  customers.id AS customer_id,
  customers.name,
  orders.id AS order_id,
  orders.product
FROM customers
INNER JOIN orders
  ON customers.id = orders.customer_id;
```

### Result

| customer_id | name  | order_id | product  |
| ----------: | ----- | -------: | -------- |
|           1 | Alice |      101 | Laptop   |
|           1 | Alice |      102 | Mouse    |
|           2 | Bob   |      103 | Keyboard |

Charlie is excluded - no row in the orders table matches customer_id 3.
