# Yerba Buena

A React + TypeScript web app for herbs, remedies, and everyday well-being.

## Getting started

You need [Node.js](https://nodejs.org/) 20.6 or newer and [PostgreSQL](https://www.postgresql.org/) 14 or newer.

```bash
npm install
cp .env.example .env    # then set DATABASE_URL if yours differs
createdb yerba_buena    # one time: create the database
npm run dev             # web app at http://localhost:5173, API at http://localhost:3001
npm test                # run all tests (no database needed)
npm run build           # type-check and build for production (dist/ and dist-server/)
```

The API creates and updates its tables on startup. You can also run `npm run db:migrate` on its own.

To run the production build, set `NODE_ENV=production`, `DATABASE_URL`, and `APP_ORIGIN` (your site's URL), then run `npm start`. The API server also serves the built web app.

## Features

| Route | Feature |
| --- | --- |
| `/herbs` | **Herb Search**: search 43 herbs and teas by name, other names, scientific name, or benefit. Filter by herbal vs. true tea. Matching remedies appear below the herbs. |
| `/herbs/:herbId` | **Herb page**: description, parts used, flavor, how to use it, traditional benefits, cautions, the remedies that use it, and herbs it pairs with. |
| `/remedies` | **Remedies**: 25 simple teas, syrups, and steams, with a filter. |
| `/remedies/:remedyId` | **Remedy page**: ingredients (linked to herb pages), steps, and cautions for the remedy and every herb in it. |
| `/trail-map` | **Trail Map**: route stops on an OpenStreetMap map. Edit the stops in `src/features/trail-map/stops.ts`. |
| `/check-in` | **Well-being Check-in**: a quick "how are you feeling today?" check-in. If someone isn't feeling good, it asks what's going on and shows support and helplines that match (for example, grief resources after a loss, or crisis lines if they mention self-harm). Edit topics and helplines in `src/features/wellbeing/support.ts`. |

| `/signup`, `/login` | **Accounts**: sign up with name, email, password, age, weight, height, goal, and optional medical conditions, then log in and out. |
| `/account` | **Account page** (logged-in users only): your details and a log-out button. |

Coming soon: avatar, workouts, and habit tracker.

## Project structure

```
src/
  main.tsx, App.tsx       # entry point and routes
  styles.css              # global styles (light and dark mode)
  components/             # shared UI: layout, back link
  hooks/                  # shared hooks
  pages/                  # home and not-found pages
  features/
    herbs/
      data/herbs.ts       # herb profiles (the HerbId type comes from this list)
      data/benefits.ts    # benefit list from the source article, verbatim
      data/remedies.ts    # remedy recipes
      data/index.ts       # catalog helpers: getHerb, remediesForHerb, ...
      lib/                # search and text normalization (with tests)
      components/, pages/
    auth/                 # AuthProvider/useAuth, RequireAuth, sign-up, log-in, account pages
    trail-map/
    wellbeing/
  lib/api.ts              # fetch wrapper for the API
shared/
  auth.ts                 # sign-up/log-in validation (zod), used by both the web app and the API
server/
  migrations/             # numbered .sql files, applied in order on startup
  src/
    index.ts              # starts the API: config, Postgres pool, migrations, HTTP server
    app.ts                # Express app (routes and middleware), also used by tests
    config.ts             # settings from environment variables / .env
    auth/                 # routes, password hashing, sessions, users
    db/                   # Postgres pool and migration runner
    http/                 # CSRF protection, error handler
```

New features go in their own folder under `src/features/` and get a route in `src/App.tsx`. Use `<RequireAuth>` for pages that need a logged-in user, and `requireUser` for API routes that do.

## Accounts and the API

| Endpoint | What it does |
| --- | --- |
| `POST /api/auth/signup` | Creates an account and logs in. Returns `{ user }`, `400` with `fieldErrors`, or `409` if the email is taken. |
| `POST /api/auth/login` | `{ email, password }`. Returns `{ user }` or `401`. |
| `POST /api/auth/logout` | Ends the session. |
| `GET /api/auth/me` | The logged-in user, or `401`. |

How it's secured:

- **Passwords** are hashed with scrypt (Node's built-in `crypto`, no native add-ons) using OWASP's recommended settings.
- **Sessions** use a random token in an `HttpOnly`, `SameSite=Lax` cookie (also `Secure` in production). The database stores only the token's SHA-256 hash, and sessions expire after 30 days (`SESSION_DAYS`). Logging in always issues a new token.
- **CSRF**: requests that change data must be JSON and come from an allowed origin (`APP_ORIGIN`).
- **Rate limiting**: 20 sign-up/log-in attempts per IP every 15 minutes (`AUTH_RATE_LIMIT`). Behind a proxy, set `TRUST_PROXY`.
- A failed log-in gives the same error and takes about the same time whether or not the email exists.
- Validation rules live in `shared/auth.ts`, so the form and the server always agree.

Server tests (`server/src/auth/*.test.ts`) run against [PGlite](https://pglite.dev), an in-memory Postgres, so they don't need a database server.

### Adding an herb or remedy

1. Add the id to `HERB_IDS` and its profile to `HERB_PROFILES` in `data/herbs.ts`. TypeScript reports an error if either one is missing.
2. To give it benefits, add a line to `RAW` in `data/benefits.ts` and map the name in `SOURCE_NAME_TO_ID`.
3. Add remedies to `data/remedies.ts`. Set `herbId` on an ingredient to link it to an herb page.
4. Run `npm test`. The catalog tests check that every herb has benefits and cautions, and that no remedy uses an herb marked as not for homemade remedies.

## Deploying to Cloudflare

The site is set up to run on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) as a static site. The settings are in `wrangler.jsonc`, which already points at the project's Cloudflare account.

One-time setup on each computer (opens a browser window to approve access):

```bash
npx wrangler login
npm run cf:whoami   # confirms which Cloudflare account you're logged in to
```

Then:

```bash
npm run cf:preview  # build and serve the site locally on Cloudflare's runtime (http://localhost:8787)
npm run cf:deploy   # build and publish to https://yerba-buena.<your-subdomain>.workers.dev
```

To use your own domain, add it in the Cloudflare dashboard under **Workers & Pages → yerba-buena → Settings → Domains & Routes**.

The API in `server/` (Express + Postgres) isn't deployed by these commands yet. When it's ready, the usual options are running it as a Worker (with Postgres through Cloudflare Hyperdrive) or hosting it elsewhere and routing `/api` to it.

## Sources and disclaimer

Herb benefits are adapted from The Tea House on Los Rios, ["The Power of Tea: 100 Health and Wellness Benefits"](https://theteahouseonlosrios.com/blogs/news/the-power-of-tea-100-health-and-wellness-benefits). The herb descriptions, cautions, and remedies were written for this app from general herbal knowledge. They should be reviewed before launch.

This information is educational and isn't medical advice. Talk with a healthcare professional before using herbs, especially if you're pregnant, nursing, or taking medication.
