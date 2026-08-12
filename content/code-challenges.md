---
title: Code Challenges
slug: code-challenges
date: 2026-08-12
author: Hamzeen Hameem
category: Code Challenges
summary: Coding challenges with JavaScript solutions, test cases, key ideas, and complexity analysis for interview preparation.
keywords:
    [coding challenges, algorithms, javascript, codility, interview preparation, problem solving]
---

### 1. Valid 24-Hour Clock Times

#### Problem

Given four digits `A`, `B`, `C`, and `D`, find the number of **unique valid 24-hour clock times** that can be formed using each digit exactly once.

A valid time must be in the format:

```text
HH:MM
```

where:

- `00 <= HH <= 23`
- `00 <= MM <= 59`

#### JavaScript Solution

```js
function solution(A, B, C, D) {
    const digits = [A, B, C, D];
    const validTimes = new Set();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j === i) continue;

            for (let k = 0; k < 4; k++) {
                if (k === i || k === j) continue;

                for (let l = 0; l < 4; l++) {
                    if (l === i || l === j || l === k) continue;

                    const hours = digits[i] * 10 + digits[j];
                    const minutes = digits[k] * 10 + digits[l];

                    if (hours <= 23 && minutes <= 59) {
                        const time =
                            `${String(hours).padStart(2, "0")}:` +
                            `${String(minutes).padStart(2, "0")}`;

                        validTimes.add(time);
                    }
                }
            }
        }
    }

    return validTimes.size;
}
```

#### Test Cases

| Input                  | Expected | Why                                                                        |
| ---------------------- | -------: | -------------------------------------------------------------------------- |
| `solution(1, 8, 3, 2)` |      `6` | Six unique valid times can be formed.                                      |
| `solution(0, 0, 0, 0)` |      `1` | The only unique time is `00:00`.                                           |
| `solution(2, 3, 5, 9)` |      `1` | The only valid time is `23:59`.                                            |
| `solution(5, 5, 5, 5)` |      `0` | `55:55` is not a valid 24-hour time.                                       |
| `solution(0, 1, 2, 3)` |     `18` | Several valid permutations exist, including `01:23`, `12:30`, and `23:10`. |
| `solution(1, 2, 3, 4)` |     `10` | Ten unique valid times can be formed.                                      |

##### Runnable Validation

```js
console.assert(solution(1, 8, 3, 2) === 6);
console.assert(solution(0, 0, 0, 0) === 1);
console.assert(solution(2, 3, 5, 9) === 1);
console.assert(solution(5, 5, 5, 5) === 0);
console.assert(solution(0, 1, 2, 3) === 18);
console.assert(solution(1, 2, 3, 4) === 10);
```

#### Complexity

Although the solution contains four nested loops, each loop always iterates over exactly four digits.

There are at most:

```text
4! = 24
```

permutations.

- **Time:** `O(1)`
- **Space:** `O(1)`

If the problem were generalized to `N` digits, generating all permutations would be `O(N!)`. For exactly four digits, the work is constant.

---

### 2. Compare OCR-Compressed Strings

#### Problem

Determine whether two OCR-compressed strings, `S` and `T`, could represent the **same original text**.

Rules:

- Letters represent characters that were successfully recognized.
- A number represents that many unreadable or unknown characters.

For example:

```text
"a2b"
```

represents a four-character string where:

- position 1 is `a`
- positions 2 and 3 are unknown
- position 4 is `b`

The goal is to determine whether `S` and `T` can describe the same original string.

#### Simple Explanation

Letters mean:

> “We definitely know this character.”

Numbers mean:

> “There are this many characters here, but OCR could not read them.”

For example:

```text
a2b
```

means the original text has 4 characters:

```text
a ? ? b
```

And:

```text
1a1b
```

means:

```text
? a ? b
```

These two **could** represent the same original text, for example:

```text
a a x b
```

#### JavaScript Solution

```js
function solution(S, T) {
    let i = 0;
    let j = 0;

    let sIndex = 0;
    let tIndex = 0;

    const n = S.length;
    const m = T.length;

    while (i < n || j < m) {
        // Both strings currently refer to the same
        // position in the original text.
        if (sIndex === tIndex) {
            if (i < n && isDigit(S[i])) {
                let num = 0;

                while (i < n && isDigit(S[i])) {
                    num = num * 10 + Number(S[i]);
                    i++;
                }

                sIndex += num;
            } else if (j < m && isDigit(T[j])) {
                let num = 0;

                while (j < m && isDigit(T[j])) {
                    num = num * 10 + Number(T[j]);
                    j++;
                }

                tIndex += num;
            } else if (i < n && j < m) {
                // Both have literal characters at the same position.
                if (S[i] !== T[j]) {
                    return false;
                }

                i++;
                j++;
                sIndex++;
                tIndex++;
            } else {
                return false;
            }
        }

        // S is behind T in the original text.
        else if (sIndex < tIndex) {
            if (i >= n) {
                return false;
            }

            if (isDigit(S[i])) {
                let num = 0;

                while (i < n && isDigit(S[i])) {
                    num = num * 10 + Number(S[i]);
                    i++;
                }

                sIndex += num;
            } else {
                // T skipped this position as an unknown character.
                i++;
                sIndex++;
            }
        }

        // T is behind S in the original text.
        else {
            if (j >= m) {
                return false;
            }

            if (isDigit(T[j])) {
                let num = 0;

                while (j < m && isDigit(T[j])) {
                    num = num * 10 + Number(T[j]);
                    j++;
                }

                tIndex += num;
            } else {
                // S skipped this position as an unknown character.
                j++;
                tIndex++;
            }
        }
    }

    return sIndex === tIndex;
}

function isDigit(char) {
    return char >= "0" && char <= "9";
}
```

#### Test Cases

| `S`     | `T`      | Expected | Why                                                                                                   |
| ------- | -------- | -------: | ----------------------------------------------------------------------------------------------------- |
| `"a2b"` | `"1a1b"` |   `true` | The known characters do not conflict and both expand to length 4.                                     |
| `"a2c"` | `"a2d"`  |  `false` | `c` and `d` occur at the same absolute position.                                                      |
| `"2a"`  | `"a2"`   |   `true` | The `a` characters occur in different positions, but the other string has an unknown character there. |
| `"2a"`  | `"2b"`   |  `false` | `a` and `b` conflict at the same absolute position.                                                   |
| `"10"`  | `"5a4"`  |   `true` | Both expand to length 10; the fully unknown string can contain `a`.                                   |
| `"a2"`  | `"a3"`   |  `false` | They expand to different total lengths: 3 and 4.                                                      |
| `"12"`  | `"3a8"`  |   `true` | Tests parsing a multi-digit number; both expand to length 12.                                         |
| `"abc"` | `"abd"`  |  `false` | The literal characters conflict at the final position.                                                |

##### Runnable Validation

```js
console.assert(solution("a2b", "1a1b") === true);
console.assert(solution("a2c", "a2d") === false);
console.assert(solution("2a", "a2") === true);
console.assert(solution("2a", "2b") === false);
console.assert(solution("10", "5a4") === true);
console.assert(solution("a2", "a3") === false);
console.assert(solution("12", "3a8") === true);
console.assert(solution("abc", "abd") === false);
```

#### Key Idea

Use two kinds of pointers:

- `i` and `j` track positions inside the compressed strings.
- `sIndex` and `tIndex` track positions inside the hypothetical original text.

When `sIndex === tIndex`, literal characters must match if both strings contain letters at that position.

When one original-text index is ahead of the other, the lagging compressed string is advanced until both positions align again.

#### Complexity

Each character in `S` and `T` is processed at most once.

- **Time:** `O(S.length + T.length)`
- **Space:** `O(1)`

---

### 3. BinaryGap

#### Problem

Given a positive integer `N`, find the length of its **longest binary gap**.

A binary gap is a sequence of consecutive `0`s that is surrounded by `1`s on both sides in the binary representation of `N`.

For example:

```text
N = 529
Binary = 1000010001
```

The longest binary gap has length `4`.

#### JavaScript Solution

```js
function solution(N) {
    const binary = N.toString(2);
    let longest = 0;
    let current = 0;
    let started = false;

    for (const bit of binary) {
        if (bit === "1") {
            if (started) {
                longest = Math.max(longest, current);
            }

            started = true;
            current = 0;
        } else if (started) {
            current++;
        }
    }

    return longest;
}
```

#### Test Cases

| Input           | Expected | Why                                                         |
| --------------- | -------: | ----------------------------------------------------------- |
| `solution(9)`   |      `2` | `9` is `1001`; the gap is `00`.                             |
| `solution(529)` |      `4` | `1000010001` contains gaps of lengths `4` and `3`.          |
| `solution(20)`  |      `1` | `10100` has one enclosed zero; trailing zeros do not count. |
| `solution(15)`  |      `0` | `1111` contains no zeros.                                   |
| `solution(32)`  |      `0` | `100000` has only trailing zeros.                           |

##### Runnable Validation

```js
console.assert(solution(9) === 2);
console.assert(solution(529) === 4);
console.assert(solution(20) === 1);
console.assert(solution(15) === 0);
console.assert(solution(32) === 0);
```

#### Key Idea

Start counting zeros only after the first `1` appears. A gap is valid only when another `1` closes it, so trailing zeros are ignored.

#### Complexity

If the binary representation has `B` bits:

- **Time:** `O(B)`
- **Space:** `O(B)` because `toString(2)` creates the binary string.

---

### 4. TapeEquilibrium

#### Problem

Given a non-empty array `A` containing at least two integers, split it into two non-empty parts and return the **minimum absolute difference** between the sums of the two parts.

For example:

```text
A = [3, 1, 2, 4, 3]
```

A split after index `2` gives:

```text
[3, 1, 2] | [4, 3]

Left sum  = 6
Right sum = 7
Difference = 1
```

#### JavaScript Solution

```js
function solution(A) {
    let rightSum = A.reduce((sum, value) => sum + value, 0);
    let leftSum = 0;
    let minDifference = Infinity;

    for (let i = 0; i < A.length - 1; i++) {
        leftSum += A[i];
        rightSum -= A[i];

        const difference = Math.abs(leftSum - rightSum);
        minDifference = Math.min(minDifference, difference);
    }

    return minDifference;
}
```

#### Test Cases

| Input                                 | Expected | Why                                      |
| ------------------------------------- | -------: | ---------------------------------------- |
| `solution([3, 1, 2, 4, 3])`           |      `1` | The best split gives sums `6` and `7`.   |
| `solution([1, 1])`                    |      `0` | Both sides have the same sum.            |
| `solution([5, 1])`                    |      `4` | The only split gives `5` and `1`.        |
| `solution([-10, -20, -30, -40, 100])` |     `20` | The minimum absolute difference is `20`. |

##### Runnable Validation

```js
console.assert(solution([3, 1, 2, 4, 3]) === 1);
console.assert(solution([1, 1]) === 0);
console.assert(solution([5, 1]) === 4);
console.assert(solution([-10, -20, -30, -40, 100]) === 20);
```

#### Key Idea

Calculate the total sum once. As the split point moves from left to right, add the current value to `leftSum` and subtract it from `rightSum` instead of recalculating both sides every time.

#### Complexity

- **Time:** `O(N)`
- **Space:** `O(1)`

---

### 5. PermMissingElem

#### Problem

An array `A` contains distinct integers from the range `1` to `N + 1`, but exactly **one number is missing**.

Return the missing number.

For example:

```text
A = [2, 3, 1, 5]
```

The complete sequence should be:

```text
1, 2, 3, 4, 5
```

So the missing number is `4`.

#### JavaScript Solution

```js
function solution(A) {
    const n = A.length + 1;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = A.reduce((sum, value) => sum + value, 0);

    return expectedSum - actualSum;
}
```

#### Test Cases

| Input                    | Expected | Why                              |
| ------------------------ | -------: | -------------------------------- |
| `solution([2, 3, 1, 5])` |      `4` | `4` is missing from `1..5`.      |
| `solution([])`           |      `1` | The only expected value is `1`.  |
| `solution([2])`          |      `1` | The expected sequence is `1, 2`. |
| `solution([1])`          |      `2` | The expected sequence is `1, 2`. |
| `solution([1, 2, 3, 4])` |      `5` | The final element is missing.    |

##### Runnable Validation

```js
console.assert(solution([2, 3, 1, 5]) === 4);
console.assert(solution([]) === 1);
console.assert(solution([2]) === 1);
console.assert(solution([1]) === 2);
console.assert(solution([1, 2, 3, 4]) === 5);
```

#### Key Idea

The sum of all integers from `1` to `N` is:

```text
N * (N + 1) / 2
```

Calculate what the total should be, subtract the sum of the values actually present, and the difference is the missing element.

#### Complexity

- **Time:** `O(N)`
- **Space:** `O(1)`

---

### 6. MaxCounters

#### Problem

You have `N` counters, all initially set to `0`.

Each value in array `A` represents one operation:

- `1 <= X <= N`: increase counter `X` by `1`.
- `X = N + 1`: set **all counters** to the highest counter value currently present.

For example:

```text
N = 5
A = [3, 4, 4, 6, 1, 4, 4]
```

The final counters are:

```text
[3, 2, 2, 4, 2]
```

#### JavaScript Solution

```js
function solution(N, A) {
    const counters = new Array(N).fill(0);
    let currentMax = 0;
    let base = 0;

    for (const operation of A) {
        if (operation >= 1 && operation <= N) {
            const index = operation - 1;

            if (counters[index] < base) {
                counters[index] = base;
            }

            counters[index]++;
            currentMax = Math.max(currentMax, counters[index]);
        } else if (operation === N + 1) {
            base = currentMax;
        }
    }

    for (let i = 0; i < counters.length; i++) {
        if (counters[i] < base) {
            counters[i] = base;
        }
    }

    return counters;
}
```

#### Test Cases

| Input                                | Expected          | Why                                                                 |
| ------------------------------------ | ----------------- | ------------------------------------------------------------------- |
| `solution(5, [3, 4, 4, 6, 1, 4, 4])` | `[3, 2, 2, 4, 2]` | Standard Codility example.                                          |
| `solution(1, [1, 2, 1])`             | `[2]`             | Increment, max-counter operation, then increment again.             |
| `solution(3, [4])`                   | `[0, 0, 0]`       | Setting all counters to the current maximum of `0` changes nothing. |
| `solution(3, [1, 1, 4, 2])`          | `[2, 3, 2]`       | The lazy base is applied before counter `2` is increased.           |

##### Runnable Validation

```js
console.assert(
    JSON.stringify(solution(5, [3, 4, 4, 6, 1, 4, 4])) === JSON.stringify([3, 2, 2, 4, 2]),
);
console.assert(JSON.stringify(solution(1, [1, 2, 1])) === JSON.stringify([2]));
console.assert(JSON.stringify(solution(3, [4])) === JSON.stringify([0, 0, 0]));
console.assert(JSON.stringify(solution(3, [1, 1, 4, 2])) === JSON.stringify([2, 3, 2]));
```

#### Key Idea

A slow solution updates all `N` counters whenever a max-counter operation appears. Instead, keep a `base` value representing the minimum value every counter should have.

Only bring an individual counter up to `base` when that counter is touched. At the end, make one final pass to apply the latest `base` to any untouched counters.

#### Complexity

Let `M` be the number of operations in `A`.

- **Time:** `O(N + M)`
- **Space:** `O(N)`
