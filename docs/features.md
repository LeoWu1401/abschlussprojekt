# Features

## Done

**Account**
- Register with name, email and password (at least 8 characters). Each email can only be used once.
- Log in and log out. Passwords are hashed with Argon2id, the session is stored in the database and is valid for 14 days.
- Protected pages: without logging in, every page except home, log in and register redirects to the login.
- The navigation shows different links depending on login status and highlights the active page.

**Posts (activities)**
- Board with all posts as cards, the next date at the top.
- Detail page of a post with type, date, federal state, city, address (if given), description, contact and a link to the artist's profile.
- Create a new post. Required fields are validated on the server. Type and federal state are select fields.
- Edit your own post, using the same form as for creating. The server checks that the post belongs to the logged-in user.

**Other**
- Sample data via a seed script.
- Online on Vercel with the database on Neon.

## Planned

- Delete a post, with confirmation.
- The board only shows posts from today onwards.
- Filter by federal state and type via the URL (`?federalState=…`).
- Validate the date when saving: from today, at most 12 months ahead.
- Profile with city, studio, style and Instagram link, editable on the profile page.
- Clickable contact (an email opens the mail program).

## Deliberately Not Planned

- Image upload, chat, admin role.
- Warnings about customers: that would be data about people who have not consented.
