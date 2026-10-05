---
title: Breadth First Search
slug: breadth-first-search
date: 2026-09-02
author: Hamzeen Hameem
category: xDSA
summary: Quick reference for Breadth First Search (BFS) in Java.
keywords: [breadth first search, bfs, java, tree traversal, queue, dsa]
---

### Tree

```text
        1
       / \
      2   3
     / \   \
    4   5   6
```

### Breadth First Search

```java
import java.util.ArrayDeque;
import java.util.Queue;

class Node {
    int value;
    Node left;
    Node right;

    Node(int value) {
        this.value = value;
    }
}

public class BFS {

    static void bfs(Node root) {
        if (root == null)
            return;

        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            Node node = queue.poll();

            System.out.print(node.value + " ");

            if (node.left != null)
                queue.add(node.left);

            if (node.right != null)
                queue.add(node.right);
        }
    }

    public static void main(String[] args) {
        Node root = new Node(1);

        root.left = new Node(2);
        root.right = new Node(3);

        root.left.left = new Node(4);
        root.left.right = new Node(5);

        root.right.right = new Node(6);

        bfs(root);
    }
}
```

```text
Output:
1 2 3 4 5 6
```

### When to Use BFS

- **Shortest path in an unweighted graph** — minimum number of edges.
- **Level-order traversal** — process a tree level by level.
- **Nearest match** — find the closest node/state first.
- **Network hops** — find nodes within N connections.
- **Grid problems** — shortest route in a maze or matrix.
