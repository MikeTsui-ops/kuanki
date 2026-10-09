import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
export const metadata: Metadata = { robots: { index: false, follow: false } }
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!['zh', 'en'].includes(locale)) notFound()
  return <html lang={locale === 'zh' ? 'zh-CN' : 'en'}><body>{children}</body></html>
}

