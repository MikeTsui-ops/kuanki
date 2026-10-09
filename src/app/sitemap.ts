import type { MetadataRoute } from 'next'
import { getEntries } from '@/lib/cms'
import { siteURL,production } from '@/lib/site'
export const dynamic='force-dynamic'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 if(!production)return []
 const base=siteURL()
 const zh=await getEntries('zh');const en=await getEntries('en')
 const common=['','/divisions','/products','/industries','/cases','/resources','/certifications','/about','/contact','/privacy']
 const paths=new Set([...common,...zh.map(e=>'/'+e.kind+'/'+e.id),...en.map(e=>'/'+e.kind+'/'+e.id)])
 return [...paths].flatMap(path=>['zh','en'].filter(locale=>common.includes(path)||(locale==='zh'?zh:en).some(e=>'/'+e.kind+'/'+e.id===path)).map(locale=>({url:base+'/'+locale+path,alternates:{languages:{'zh-CN':base+'/zh'+path,en:base+'/en'+path}}})))
}

