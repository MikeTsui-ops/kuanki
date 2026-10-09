import { existsSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
if (!existsSync('.env')) {
  const host = process.env.CODESPACE_NAME
    ? 'https://' + process.env.CODESPACE_NAME + '-3000.' + (process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev')
    : 'http://localhost:3000'
  const database = process.env.DATABASE_URL || 'postgresql://kuanki:kuanki_dev_only@db:5432/kuanki'
  writeFileSync('.env', [
    'DATABASE_URL=' + database,
    'PAYLOAD_SECRET=' + randomBytes(32).toString('hex'),
    'SITE_ENV=preview',
    'NEXT_PUBLIC_SERVER_URL=' + host,
    '',
  ].join('\n'), { mode: 0o600, flag: 'wx' })
  console.log('Created ignored development environment file. Secret values are not displayed.')
} else {
  console.log('Existing .env preserved.')
}

