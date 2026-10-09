#!/usr/bin/env bash
set -euo pipefail
npm install --global pnpm@10.28.2
pnpm install --frozen-lockfile
pnpm dev:setup
pnpm generate:importmap
pnpm exec next typegen
pnpm typecheck
pnpm payload run scripts/seed-content.ts
printf '\nReady. Run pnpm dev, then open the private port 3000.\n'
