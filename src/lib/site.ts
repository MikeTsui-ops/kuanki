import type { Metadata } from 'next'
import { company, type Locale } from './content'
export const production = process.env.SITE_ENV === 'production'
export function siteURL() {
  const raw = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return new URL(raw).origin
}
export function metadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const base = siteURL()
  return {
    title: title + ' | KUANKI', description, metadataBase: new URL(base),
    alternates: { canonical: base + '/' + locale + path, languages: { 'zh-CN': base + '/zh' + path, en: base + '/en' + path, 'x-default': base + '/en' + path } },
    openGraph: { type: 'website', title, description, url: base + '/' + locale + path, siteName: company[locale], locale: locale === 'zh' ? 'zh_CN' : 'en_US', images: [{ url: '/brand/share-card.png', width:1200,height:630 }] },
    robots: { index: production, follow: production },
  }
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c') }
