# Architecture

## Overview

Ink-Board is a single Next.js app. There is no separate backend: pages are rendered on the server as Server Components and read from the database directly with Prisma. Forms call Server Actions, which write data.

```mermaid
flowchart LR
    Browser -->|open page| SC[Server Component<br/>app/**/page.tsx]
    Browser -->|submit form| SA[Server Action<br/>app/actions/*.ts]
    SC --> Session[lib/session.ts<br/>requireUser]
    SA --> Session
    SC --> Prisma[lib/prisma.ts<br/>Prisma Client]
    SA --> Prisma
    Prisma --> DB[(Postgres on Neon)]
```

## Server and Client Components

| Type | Where | Why |
|---|---|---|
| Server Components | all pages in `app/` | read data and check the session on the server |
| Client Component | `app/components/Nav.tsx` | needs `usePathname` to highlight the active link |
| Server Actions | `app/actions/auth.ts`, `app/actions/posts.ts` | register, log in, log out, create and edit posts |

## Data Model

```mermaid
erDiagram
    User ||--o{ Post : "writes"
    User ||--o{ Session : "has"

    User {
        Int id PK
        String name
        String email UK
        String password "Argon2 hash"
        DateTime createdAt
    }
    Session {
        String id PK "UUID, stored in cookie"
        Int userId FK
        DateTime expiresAt
    }
    Post {
        Int id PK
        String title
        PostType type
        FederalState federalState
        String city
        String address "optional"
        Date date
        String description
        String contact
        DateTime createdAt
        Int userId FK
    }
```

- `PostType` and `FederalState` are enums. Their German labels are in `lib/labels.ts`.
- When a user is deleted, the database also deletes their posts and sessions (`onDelete: Cascade`).

## Authentication

Authentication is custom-built, without an auth library. Passwords are hashed with Argon2id. The session is stored in the database; the browser only receives its ID as an `httpOnly` cookie.

```mermaid
sequenceDiagram
    actor A as Artist
    participant L as login()<br/>Server Action
    participant DB as Database
    participant P as Protected page

    A->>L: email and password
    L->>DB: find user by email
    L->>L: argon2.verify(hash, password)
    L->>DB: create session (valid for 14 days)
    L-->>A: cookie "session" = session ID, redirect to /board
    A->>P: open page (cookie is sent along)
    P->>DB: find session by ID, check expiry
    alt no valid session
        P-->>A: redirect to /login
    else valid
        P-->>A: page with data
    end
```

## Who May Change What

- `requireUser()` in `lib/session.ts` protects every page and every Server Action that needs a logged-in user.
- `requireOwnPost(id)` in `lib/posts.ts` additionally checks whether the post belongs to the logged-in user. The check runs on the server, not just by hiding buttons. A forged `id` field in the form is therefore not enough to change someone else's post.

## Deployment

Vercel builds the app on every push to `main`. The build command is defined in `vercel.json`:

```
prisma generate → prisma migrate deploy → prisma db seed → next build
```

The seed only adds sample data if no user exists yet.
