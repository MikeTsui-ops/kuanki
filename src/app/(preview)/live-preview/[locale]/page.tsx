import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { cms, getEntries, getSettings } from '@/lib/cms'
import { LivePreview } from '@/components/live-preview'
import type { Locale } from '@/lib/content'
export const dynamic='force-dynamic'
export const metadata={title:'KUANKI — Live preview',robots:{index:false,follow:false}}
export default async function Preview({params,searchParams}:{params:Promise<{locale:Locale}>;searchParams:Promise<{type?:string;id?:string}>}) {
  const {locale}=await params
  if(!['zh','en'].includes(locale))notFound()
  const payload=await cms()
  const {user}=await payload.auth({headers:await headers()})
  if(!user)redirect('/admin/login')
  const {type,id}=await searchParams
  if(type!=='settings'&&type!=='content')notFound()
  const initialData=type==='settings'
    ? await payload.findGlobal({slug:'site-settings',locale,fallbackLocale:false,depth:1,user,overrideAccess:false})
    : id ? await payload.findByID({collection:'content',id,locale,fallbackLocale:false,depth:1,draft:true,user,overrideAccess:false})
    : {kind:'products' as const,slug:'',title:'',intro:'',sections:[]}
  const [entries,settings]=await Promise.all([getEntries(locale),getSettings(locale)])
  return <LivePreview locale={locale} type={type} initialData={initialData} entries={entries} settings={settings}/>
}
