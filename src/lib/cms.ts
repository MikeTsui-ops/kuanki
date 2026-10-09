import { cache } from 'react'
import { company, initialContent, type Entry, type Locale } from './content'
export type SiteSettings = { email?: string; phone?: string; address?: string; headline?: string; intro?: string; certificateNote?: string }
export const cmsEnabled = () => process.env.CONTENT_SOURCE === 'cms' || (process.env.CONTENT_SOURCE !== 'static' && process.env.CODESPACES === 'true')
export async function cms() { const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')]); return getPayload({ config }) }
export const getEntries = cache(async (locale: Locale): Promise<Entry[]> => {
  const defaults = initialContent(locale)
  if (!cmsEnabled()) return defaults
  try {
    const payload = await cms()
    const result = await payload.find({ collection:'content', locale, fallbackLocale:false, limit:500, sort:'createdAt', depth:1, overrideAccess:false, where:{_status:{equals:'published'}} })
    const overrides = result.docs.filter((d:any)=>d.title && d.intro).map((d:any)=>({
      id:d.slug,kind:d.kind,title:d.title,intro:d.intro,tag:d.tag || 'KUANKI',division:d.division || undefined,
      sections:d.sections || [],image:typeof d.image==='object' ? d.image?.url : undefined,
      imageAlt:typeof d.image==='object' ? d.image?.alt : undefined,downloadURL:typeof d.download==='object' ? d.download?.url : undefined,seoTitle:d.seo?.title,seoDescription:d.seo?.description,
    } as Entry))
    return overrides
  } catch(error) { console.error('CMS content unavailable.', error instanceof Error ? error.name : 'Error'); return [] }
})
export const getSettings = cache(async (locale: Locale): Promise<SiteSettings> => {
  if (!cmsEnabled()) return {}
  try { const payload=await cms(); return await payload.findGlobal({slug:'site-settings',locale,fallbackLocale:false,overrideAccess:false}) as SiteSettings }
  catch { return {} }
})
export { company }
