---
title: Authentication & Authorization
slug: auth
date: 2026-08-14
author: Hamzeen Hameem
category: Backend
summary: A concise distinction between authentication and authorization.
keywords:
    [
        authentication,
        authorization,
        JWT,
        token authentication,
        access token,
        refresh token,
        bearer token,
        JWT claims,
        HttpOnly cookie,
        token storage,
        XSS,
    ]
---

### JWT Authentication

JWT is a standard for creating tokens used in token-based authentication. It contains claims about the user.

- The backend signs it with a secret or private key that must never be exposed to the frontend; the signature allows the backend to detect modified tokens and confirm who issued them.

A common application setup uses:

- short-lived **access token** returned in the response body; long-lived **refresh token** in a `Secure`, `HttpOnly` cookie.

```text
Login
  → Backend validates the credentials
  → Response body contains the access token
  → HttpOnly cookie stores the refresh token

Access token expires
  → Frontend calls POST /auth/refresh
  → Browser sends the refresh-token cookie automatically
  → Backend validates the refresh token
  → Response body contains a new access token
```

```json
{ "accessToken": "header.payload.signature" }
```

Frontend should prefer storing access tokens in memory (ex: app state); sessionStorage & localStorage are vulnerable to XSS attacks. The frontend then sends the access token with protected API requests:

```text
Authorization: Bearer <access-token>
```

The backend verifies the signature and validates claims such as the issuer, audience, and expiry before trusting the token. Frontend may decode claims for display or expiry checks, but this does not verify the signature (not for authorization).

```javascript
import { jwtDecode } from "jwt-decode";
const decoded = jwtDecode("eyJhbGciOiJIUzI1NiI...your_jwt_here");
// { sub: "1234567890", name: "John Doe", exp: 1719999999 }
```

### Authentication & Authorization

**Authentication** verifies who you are.

**Authorization** determines what you are allowed to do.

```http
DELETE /api/orders/42
Authorization: Bearer <access-token>
```

```java
public void deleteOrder(Long orderId, Long currentUserId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new NotFoundException("Order not found"));

    if (!order.getUserId().equals(currentUserId)) {
        throw new ForbiddenException("You cannot delete this order");
    }

    orderRepository.delete(order);
}
```

The backend verifies that the order belongs to the authenticated user before deleting it. A user cannot delete another user’s order.
