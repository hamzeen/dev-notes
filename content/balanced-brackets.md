---
title: Balanced Brackets
slug: balanced-brackets
date: 2026-08-28
author: Hamzeen Hameem
category: xDSA
summary: Sort + two pointer algorithm.
keywords: [java, DSA, balanced paranthese]
---

### Stack / LIFO algorithm

**Problem**:
Given a string s containing three types of brackets {}, () and []. Determine whether the Expression are balanced or not.

**Balanced**: "[()()]{}" → every opening bracket is closed in the correct order.

**Not balanced**: "([{]})" → the ']' closes before hand.

```text
Opening bracket → push to stack
Closing bracket → pop and match
Stack must be empty at the end

LIFO: Last opened → First closed
([{}])
  ↑
{ is opened last → } must close first
```

**Time complexity**: O(n)

**Space complexity**: O(n)

```java
function isBalanced(expr) {

	// ArrayDeque is faster than using Stack class
	let stack = [];
	const pairs = { ')': '(', '}': '{', ']': '[' };
	for(let i = 0; i < expr.length; i++) {
		let x = expr[i];
		if (x == '(' || x == '[' || x == '{') {
			// Push the element in the stack
			stack.push(x);
			continue;
		}

		if (stack.length == 0) // If current character is not opening
			return false;

		let check;
		if (pairs[x]) {
			check = stack.pop();
			if (check != pairs[x])
				return false;
		}
	}
	// Check Empty Stack
	return (stack.length == 0);
}

// TEST
isBalanced("([{}])");
```
