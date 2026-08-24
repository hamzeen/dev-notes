---
title: API Design
slug: api-design
date: 2026-08-24
author: Hamzeen Hameem
category: Backend
summary: A quick reference for designing RESTful API endpoints using HTTP verbs, resources, and pagination.
keywords: [api-design, restful, http verbs]
---

### RESTful API Design

Use nouns for resources and HTTP verbs to describe the action.

| Purpose     | URL                    | HTTP Verb |
| :---------- | :--------------------- | :-------- |
| Create user | `/users`               | `POST`    |
| Get user    | `/users/{id}`          | `GET`     |
| Get 5 users | `/users?page=0&size=5` | `GET`     |
| Delete user | `/users/{id}`          | `DELETE`  |
