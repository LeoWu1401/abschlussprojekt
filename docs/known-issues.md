# Known Issues

| Issue | Where | Effect |
|---|---|---|
| Past posts still appear on the board | `app/board/page.tsx` | The query does not filter by date, old activities stay visible |
| The date is not checked against a range | `readPostForm` in `app/actions/posts.ts` | Posts with a date in the past or far in the future can be saved |
| Posts cannot be deleted yet | – | There is neither a button nor a Server Action |
| Profile pages are placeholders | `app/profile/` | `User` has no fields yet for city, studio, style and Instagram link |
| Contact is plain text | `app/posts/[id]/page.tsx` | Email or WhatsApp link is not clickable |
| Expired sessions stay in the database | `lib/session.ts` | They are no longer accepted, but never deleted |
| README is still the `create-next-app` template | `README.md` | It does not describe the project |
| Form error messages are generic | form pages | "Please fill in all required fields" does not say which field is missing |
