# KUANKI cloud development
江苏匡集工业科技有限公司 / Jiangsu Kuanki Industry&Technology Co., Ltd

This is the initial development environment, not the finished marketing website.

## Codespaces
1. Source is hosted at https://github.com/MikeTsui-ops/kuanki (public, explicitly approved by the owner). Keep Codespaces preview ports private.
2. Code → Codespaces → Create codespace. The committed devcontainer starts Node.js 22 and PostgreSQL 17.
3. Wait for setup: pinned pnpm install, lockfile installation, local secret generation, Payload import-map generation, TypeScript check.
4. Run `pnpm dev`.
5. Open **private** port 3000. Check `/zh`, `/en`, and `/admin`.
6. Create your own first CMS administrator at `/admin`. Never make the port public before this step.
7. Enter a draft page in Chinese and English, upload a sample image, restart the development server and verify persistence.

## Commands
- `pnpm dev`: development server
- `pnpm typecheck`: static validation
- `pnpm build`: production compilation (requires correct environment and PostgreSQL)
- `pnpm generate:importmap`: refresh CMS component map
- `pnpm generate:types`: generate content types
- `pnpm payload migrate:create`: prepare reviewed database migrations for future production

## Data and security
- PostgreSQL has no public or forwarded port. The committed password is **development-only**, inside the isolated compose network.
- Database uses a named Docker volume. Stop/restart preserves it; deleting a Codespace can destroy development data. Export important content first.
- Uploads live in ignored `media/` inside the Codespace. Production must use durable object storage.
- `.env` is generated on first setup with a random secret, ignored by Git and preserved on re-run. No production credentials belong in Git.
- Preview HTML has noindex metadata, all responses have a noindex header, and robots disallows crawling. Ports remain private.
- CMS accounts/media require authentication. Pages expose only published content to unauthenticated API requests.
- Codespaces is for development and may stop when idle; it is **not** production hosting. Check your GitHub usage allowance before starting.
- No real customer data or production inquiries should be stored here.

## Brand assets
- `assets/original/logo.svg`: unchanged original Illustrator SVG.
- `public/brand/logo.svg`: same artwork and brand color #D93924, with the viewBox cropped to the actual mark.
- The preview logo is served locally; no external font or image dependency.

## Scope still to implement
Full site templates, product/case content models, editable homepage, production SEO and sitemap, inquiry workflow, production storage, analytics consent, and launch verification remain future work.
