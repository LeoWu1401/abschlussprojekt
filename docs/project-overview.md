# Project Overview

**Ink-Board** is a pinboard for joint activities of tattoo artists. Artists post, for example, a flash day, look for a guest spot or offer a ride to a convention. Other artists see the posts and get in touch via the contact given.

The app is for artists only, not for customers.

## Goal

Final project of the backend module: a full-stack application built with Next.js that

- stores data in a relational database (Postgres on Neon),
- accesses the database through Prisma (schema, migrations, seed),
- has its own user authentication (password hash, session cookie),
- creates and updates data through Server Actions (CRUD),
- runs online on Vercel.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Postgres on Neon |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Password hashing | Argon2id (`argon2`) |
| Deployment | Vercel, code on GitHub |

## Getting Started

```bash
npm install
npx prisma migrate dev   # create tables
npx prisma db seed       # add sample data
npm run dev              # http://localhost:3000
```

The `.env` file needs two connection strings for Neon:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Connection used by the app (pooled) |
| `DATABASE_URL_UNPOOLED` | Connection used by Prisma migrations (direct) |

## Code Conventions

- Code, file names and commit messages are in English, the user interface is in German.
- An activity is called `Post` in the code, because `Action` would be confused with "Server Action".

## Further Documents

- [architecture.md](architecture.md): structure of the app, data model, login flow
- [key-files.md](key-files.md): the most important files
- [features.md](features.md): what the app can do
- [known-issues.md](known-issues.md): known problems
- [next-tasks.md](next-tasks.md): next steps
