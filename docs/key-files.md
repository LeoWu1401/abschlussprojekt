# Key Files

## Pages (`app/`)

Every folder with a `page.tsx` is a page. Folders in square brackets are dynamic parts of the URL.

| File | URL | Content |
|---|---|---|
| `app/page.tsx` | `/` | Home page, redirects logged-in users to the board |
| `app/register/page.tsx` | `/register` | Register |
| `app/login/page.tsx` | `/login` | Log in |
| `app/board/page.tsx` | `/board` | Board with all posts, sorted by date |
| `app/posts/[id]/page.tsx` | `/posts/1` | Single post, "Edit" only for the owner |
| `app/posts/new/page.tsx` | `/posts/new` | Create a new post |
| `app/posts/[id]/edit/page.tsx` | `/posts/1/edit` | Edit your own post |
| `app/profile/[id]/page.tsx` | `/profile/1` | Profile (placeholder for now) |
| `app/profile/edit/page.tsx` | `/profile/edit` | Edit profile (placeholder for now) |
| `app/layout.tsx` | all | Base layout with navigation, fonts, metadata |

## Server Actions (`app/actions/`)

| File | Functions |
|---|---|
| `auth.ts` | `register`, `login`, `logout` |
| `posts.ts` | `createPost`, `updatePost`, plus `readPostForm` to validate form fields |

## Components (`app/components/`)

| File | Purpose |
|---|---|
| `Nav.tsx` | Navigation, links depend on login status, highlights the active page (Client Component) |
| `PostCard.tsx` | Card of a post on the board |
| `PostForm.tsx` | Form for creating and editing, prefilled when editing |
| `Field.tsx`, `SelectField.tsx` | Input field and select field with label |

## Helpers (`lib/`)

| File | Purpose |
|---|---|
| `prisma.ts` | One shared Prisma Client for the whole app |
| `session.ts` | `createSession`, `deleteSession`, `getCurrentUser`, `requireUser` |
| `posts.ts` | `requireOwnPost`: load a post and check that it belongs to the user |
| `labels.ts` | German labels for post types and federal states |
| `format.ts` | Date in German format |

## Database (`prisma/`)

| File | Purpose |
|---|---|
| `schema.prisma` | Tables `User`, `Session`, `Post` and the enums |
| `migrations/` | Migrations that apply the schema to the database |
| `seed.ts`, `seed-data.ts` | Sample artists and sample posts |

## Configuration

| File | Purpose |
|---|---|
| `prisma.config.ts` | Paths for schema, migrations, seed and the connection used for migrations |
| `vercel.json` | Build command on Vercel including migration and seed |
| `next.config.ts` | Tailwind via Turbopack |
| `.env` | Connection strings for Neon (not in the repository) |
