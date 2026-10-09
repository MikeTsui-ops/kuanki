import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig, type CollectionConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
const Users: CollectionConfig = {
  slug: 'users', auth: true, admin: { useAsTitle: 'email' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  fields: [],
}
const Media: CollectionConfig = {
  slug: 'media',
  upload: { staticDir: path.resolve(dirname, '../media'), mimeTypes: ['image/*', 'application/pdf'] },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  fields: [{ name: 'alt', type: 'text', localized: true, required: true }],
}
const Pages: CollectionConfig = {
  slug: 'pages', admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => req.user ? true : { _status: { equals: 'published' } },
    create: authenticated, update: authenticated, delete: authenticated,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
    ] },
  ],
}
export default buildConfig({
  admin: { user: 'users', importMap: { baseDir: dirname } },
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  localization: { locales: [{ label: '简体中文', code: 'zh' }, { label: 'English', code: 'en' }], defaultLocale: 'zh', fallback: false },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' }, push: process.env.SITE_ENV !== 'production' }),
  editor: lexicalEditor(), sharp,
  collections: [Users, Media, Pages],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})

