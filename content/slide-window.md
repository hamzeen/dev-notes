---
title: Sliding Window
slug: sliding-window
date: 2026-08-28
author: Hamzeen Hameem
category: xDSA
summary: Data Structure and algorithms.
keywords: [java, DSA, sliding window]
---

### Fixed-Size Sliding Window

**Problem**: find the maxiumum sum of k consecutive elements in an array.

Use when processing a contiguous window of fixed size k. Calculate the first window.

Slide one position at a time. Add incoming element and subtract outgoing element.

```text
Time complexity: O(n) instead of O(n × k).

new window = old window + incoming - outgoing
```

```java
public class FixedSlidingWindow {

    public static int findMaxSum(int[] arr, int k) {
        if (arr == null || k <= 0 || arr.length < k) return 0;

        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        // Slide the window
        int maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            // Add the incoming element, subtract the outgoing element
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        int[] nums = {2, 1, 5, 1, 3, 2};
        int k = 3;

        // Max sum of 3 consecutive elements is 9 (5 + 1 + 3)
        System.out.println(findMaxSum(nums, k));
    }
}
```

**answer**: [5, 1, 3] → 9.
