# Fourfold

A live two-player Connect Four game for the [Coding Jam multiplayer track](https://codingjam.dev/tracks/multiplayer).

Create a room, share its code or invite link, and take turns dropping pieces. The first player to connect four horizontally, vertically, or diagonally wins.

## Features

- Two-player rooms with six-character codes and invite links
- Automatic board updates every 900 ms without refreshing
- Server-validated turns, gravity, wins, draws, and full columns
- Persistent Cloudflare D1 game state
- Atomic revision checks to prevent conflicting simultaneous moves
- Rematches accepted by both players, with alternating starting players
- Responsive layout and keyboard-accessible column controls

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_colorful_otto_octavius.sql
npm run dev
```

Open http://127.0.0.1:5173/. Apply the migration once per fresh local database. Create a room in one browser profile and join it in a second profile to test both players.

Player credentials stay in session storage. Keep the original tab to retain your seat. After refreshing, enter a name and rejoin the same room to reclaim your seat. Duplicated tabs may share credentials, so use separate browser profiles for separate players.

## Checks

```sh
node node_modules/typescript/bin/tsc --noEmit
node scripts/test-rules.mjs
npm run build
```

With the local server running and its database initialized:

```sh
node scripts/test-game.mjs
```

Integration checks cover joining, cross-client state, turn enforcement, invalid moves, wins, rematches, and concurrent move protection. Rule checks cover all four winning directions and full columns.

## Stack and source

React, TypeScript, Vinext, Cloudflare Workers, D1, Drizzle migrations, and Tailwind CSS.

- `app/page.tsx`: game interface and polling
- `app/api/game/route.ts`: room and move API
- `lib/game.ts`: board rules and win detection
- `db/schema.ts` and `drizzle/`: database schema and migrations
- `app/globals.css`: responsive styling

## Deployment

This repository contains the application source, not a live hosted demo. GitHub Pages alone cannot run the backend or database. Deploy the built Worker and configure its D1 binding, or resume the existing private Sites project recorded in `.openai/hosting.json` when that integration is available. The earlier Sites publication did not complete.

For the Coding Jam submission, deploy with access for other players and test the invite link from a second device before submitting the live URL and this repository.

Optional WebMCP move support is feature-detected; its browser runtime validation has not been completed.
