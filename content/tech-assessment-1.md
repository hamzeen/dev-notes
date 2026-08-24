---
title: "technical-assessment-1"
slug: technical-assessment-1
date: 2026-08-23
author: Hamzeen Hameem
category: "Interview"
summary: Quick-reference answers covering JavaScript, React, HTTP, security, SQL, transactions, and caching.
keywords:
    [
        javascript,
        react,
        closures,
        async await,
        promises,
        idempotency,
        authentication,
        authorization,
        sql,
        transactions,
        joins,
        interview,
    ]
---

### Assessment Questions

| Question                                                                                                                                                                              | Correct Answer                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| What is a JavaScript closure?                                                                                                                                                         | A function that retains access to its outer scope's variables.                        |
| What does `async/await` do in JavaScript?                                                                                                                                             | Pauses the async function without blocking the event loop.                            |
| `[1, 2, 3, 4, 5].filter(n => n % 2 === 0).map(n => n * 10)`                                                                                                                           | `[20, 40]`                                                                            |
| What does this print ? <br/>`console.log("1"); Promise.resolve().then(() => console.log("2")); console.log("3");`                                                                     | `1, 3, 2`                                                                             |
| When does a React component re-render?                                                                                                                                                | When state, props, or a parent's render changes.                                      |
| What does idempotency mean in the context of HTTP methods?                                                                                                                            | Multiple identical requests produce the same result as one.                           |
| What is the difference between authentication and authorization?                                                                                                                      | Authentication verifies who you are; authorization determines what you can do.        |
| Two SQL statements run inside one transaction. The first succeeds, the second fails, and the transaction is rolled back. What is the database state afterwards?                       | The first statement is undone, leaving the database as it was before the transaction. |
| Which JOIN type returns only rows from the left table that have matching rows in the right table?                                                                                     | `INNER JOIN`                                                                          |
| An application caches an expensive database query for 5 minutes. A user updates the underlying data, but the next page load still shows the old value. What is the most likely cause? | The cache was not invalidated when the data was updated.                              |
