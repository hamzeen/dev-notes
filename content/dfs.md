---
title: Depth First Search
slug: depth-first-search
date: 2026-09-02
author: Hamzeen Hameem
category: xDSA
summary: Quick reference for Depth First Search (DFS) in Java.
keywords: [depth first search, dfs, java, tree traversal, recursion, dsa]
---

### DFS - Depth first search

```text
        1
       / \
      2   3
     / \   \
    4   5   6
```

```java
class Node {
    int value;
    Node left;
    Node right;

    Node(int value) {
        this.value = value;
    }
}

public class DFS {

    static void dfs(Node node) {
        if (node == null)
            return;

        System.out.print(node.value + " ");

        dfs(node.left);
        dfs(node.right);
    }

    public static void main(String[] args) {
        Node root = new Node(1);

        root.left = new Node(2);
        root.right = new Node(3);

        root.left.left = new Node(4);
        root.left.right = new Node(5);

        root.right.right = new Node(6);

        dfs(root);
    }
}
```

```text
Output:
1 2 4 5 3 6
```

**Usage**

- **Explore every path** — tree/graph traversal.
- **Backtracking** — maze, Sudoku, permutations.
- **Cycle detection** — directed or undirected graphs.
- **Connected components** — find grouped/reachable nodes.
- **Topological sorting** — dependency ordering in a DAG.
