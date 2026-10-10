import { HomeView } from '@/components/home-view'
import { notFound } from 'next/navigation'
import { getEntries, getSettings } from '@/lib/cms'
import { t, company, type Locale } from '@/lib/content'
import { metadata, jsonLd, siteURL } from '@/lib/site'
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}) {
  const {locale}=await params
  return metadata(locale,'',t(locale,'工业输送、集中供气与循环水处理','Industrial conveying, gas systems & water treatment'),t(locale,'匡集工业科技，聚焦传动输送、集中供气和循环水处理。国家高新技术企业，ISO 9001认证，新四板挂牌代码656681。','KUANKI provides screw conveying, central gas distribution and circulating water treatment solutions. Explore our capabilities and discuss your project.'))
}
export default async function Home({params}:{params:Promise<{locale:Locale}>}) {
  const {locale}=await params
  if(!['zh','en'].includes(locale))notFound()
  const [entries,settings]=await Promise.all([getEntries(locale),getSettings(locale)])
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'Organization',name:company[locale],alternateName:'KUANKI',url:siteURL()+'/'+locale,logo:siteURL()+'/brand/logo.svg',...(settings.email?{email:settings.email}:{})})}}/><HomeView locale={locale} entries={entries} settings={settings}/></>
}
