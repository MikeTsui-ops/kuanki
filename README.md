# KUANKI bilingual industrial website

Jiangsu Kuanki Industry&Technology Co., Ltd / 江苏匡集工业科技有限公司

Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui + Payload CMS + PostgreSQL.

## Start in Codespaces
Keep preview port 3000 **private**. On a new Codespace, initialization installs dependencies, generates an ignored local secret, checks types and imports bilingual baseline content.

For an existing Codespace:
```bash
git pull --ff-only
pnpm install --frozen-lockfile
pnpm generate:importmap
pnpm payload run scripts/seed-content.ts
pnpm dev
```
Open `/zh`, `/en` or `/admin`. The first registered CMS user becomes administrator.

## Features
- Responsive bilingual homepage, divisions, products, industries, case-study slots, technical articles, credentials, company, contact and privacy pages.
- CMS drafts and localized content, public-media approval, downloadable documents, administrator/editor access.
- Server-validated database inquiries, idempotency, basic rate limiting, consent and campaign attribution.
- Canonical/hreflang metadata, breadcrumbs, organization/article structured data, production sitemap, preview noindex.
- Local brand assets and original conceptual engineering illustrations.

## Validation
`pnpm typecheck` and `pnpm build` validate the application. GitHub Actions also provisions PostgreSQL, verifies draft/access rules and bilingual publishing, seeds content, and tests real inquiry persistence and private inquiry access.

## Production is separate
Codespaces is a development environment, not permanent hosting. Domain, production database/object storage, backups, email notifications, analytics providers and remaining corporate materials must be configured before launch. Do not store production credentials in Git.

[Chinese operating guide](docs/WEBSITE_HANDOVER.zh-CN.md)
