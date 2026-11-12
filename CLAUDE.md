# CLAUDE.md

@AGENTS.md

Ink-Board: a pinboard where tattoo artists post joint activities (flash days, guest spots, conventions). Final project of a backend module. Next.js 16 App Router, React 19, Prisma 7 on Neon Postgres, Tailwind 4, deployed on Vercel. Longer docs live in `docs/` (architecture, features, known issues, next tasks); check `docs/known-issues.md` and `docs/next-tasks.md` before starting a feature, and update them when you change what they describe.

## Commands

```bash
npm run dev                # dev server on http://localhost:3000
npm run build              # production build
npm run lint               # ESLint (flat config, eslint-config-next)
npx prisma generate        # regenerate client into app/generated/prisma (gitignored)
npx prisma migrate dev --name <name>   # after editing prisma/schema.prisma
npx prisma db seed         # runs `tsx prisma/seed.ts`
```

There is no test suite. Verify changes with `npm run lint`, `npm run build`, and by running the app.

The Prisma client is not committed. After a fresh clone or any schema change, run `npx prisma generate` or imports from `@/app/generated/prisma/client` fail.

`.env` needs `DATABASE_URL` (pooled, used by the app in `lib/prisma.ts`) and `DATABASE_URL_UNPOOLED` (direct, used by the Prisma CLI via `prisma.config.ts`).

## Architecture

- No separate backend and no API routes. Pages are Server Components that query Prisma directly. Mutations go through Server Actions in `app/actions/` and are called by plain `<form action={...}>`. Use Client Components only where needed (hooks, event handlers).
- Import Prisma types and enums from `@/app/generated/prisma/client` (Prisma 7 `prisma-client` generator with `@prisma/adapter-pg`), and always use the shared client from `@/lib/prisma`.
- Auth is hand-rolled, with no auth library: Argon2id hashes, a `Session` row in the DB, and its UUID in an `httpOnly` cookie named `session` (14 days). `getCurrentUser()` returns `null` if not logged in. `requireUser()` redirects to `/login`. Call `requireUser()` in every protected page and in every Server Action.
- Ownership: `requireOwnPost(id)` in `lib/posts.ts` loads a post and redirects if the logged-in user doesn't own it. Every action that changes or deletes a post must call it on the server. Hiding a button is not enough.
- Form errors: actions `redirect()` back to the form with `?error=<code>`, and the page reads `searchParams` to show a German message. Validation lives in `readPostForm` in `app/actions/posts.ts`, which `createPost` and `updatePost` share. After a mutation, call `revalidatePath` on the affected pages.
- Next 16 conventions used here: `params` and `searchParams` are Promises (await them), `cookies()` is async, and the root layout uses the global `LayoutProps<"/">` type.
- Tailwind 4 is wired through a Turbopack CSS loader in `next.config.ts`, not through PostCSS.
- Vercel build (`vercel.json`): `prisma generate → prisma migrate deploy → prisma db seed → next build`. Migrations therefore run against production on every push to `main`. The seed is a no-op once any user exists.

## Conventions

- Code, file names, and commit messages are in English. All UI text is German (`<html lang="de">`).
- An activity is called `Post` in code, never `Action`, so it isn't confused with Server Actions.
- German labels for the `PostType` and `FederalState` enums live in `lib/labels.ts`. Use those records for display and for validating select values. Format dates with `formatDate` from `lib/format.ts` (`de-DE`).
