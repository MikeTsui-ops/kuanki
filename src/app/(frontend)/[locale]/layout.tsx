import { notFound } from 'next/navigation'
import { Header } from '@/components/navigation'
import { Footer } from '@/components/site-parts'
import { getSettings } from '@/lib/cms'
import type { Locale } from '@/lib/content'
import '../globals.css'
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params
  if(locale!=='zh'&&locale!=='en')notFound()
  const settings=await getSettings(locale as Locale)
  return <html lang={locale==='zh'?'zh-CN':'en'}><body><a className="skip-link" href="#main">{locale==='zh'?'跳转到正文':'Skip to content'}</a><Header locale={locale}/>{children}<Footer locale={locale} settings={settings}/></body></html>
}

