'use client'
import { useState } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { HomeView } from './home-view'
import { EntryDetail } from './entry-detail'
import { Header } from './navigation'
import { Footer } from './site-parts'
import { t, type Entry, type Locale } from '@/lib/content'
import type { SiteSettings } from '@/lib/cms'
import type { Content, SiteSetting } from '@/payload-types'
type PreviewData=Partial<Omit<Content, keyof SiteSetting> & SiteSetting>
export function LivePreview({locale,type,initialData,entries,settings}:{locale:Locale;type:'settings'|'content';initialData:PreviewData;entries:Entry[];settings:SiteSettings}) {
  const {data}=useLivePreview<PreviewData>({initialData,serverURL:typeof window==='undefined'?'':window.location.origin,depth:1})
  const [view,setView]=useState('home')
  const liveSettings=type==='settings'?data as SiteSettings:settings
  const entry:Entry={id:data.slug||'',kind:data.kind||'products',title:data.title||'',intro:data.intro||'',tag:data.tag||'KUANKI',division:data.division||undefined,
    sections:(data.sections||[]).filter(Boolean).map(s=>({title:s.title||'',text:s.text||''})),
    image:typeof data.image==='object'?data.image?.url||undefined:undefined,imageAlt:typeof data.image==='object'?data.image?.alt:undefined,
    downloadURL:typeof data.download==='object'?data.download?.url||undefined:undefined}
  return <><div style={{padding:'10px 20px',background:'#f7eee9',fontSize:13}} role="status">{t(locale,'实时预览 · 未保存的修改仅在此处显示','Live preview · Unsaved changes are visible only here')}
    {type==='settings'&&<select aria-label="Preview page" value={view} onChange={e=>setView(e.target.value)} style={{marginLeft:16}}><option value="home">{t(locale,'首页','Home')}</option><option value="contact">{t(locale,'联系信息','Contact details')}</option><option value="credentials">{t(locale,'资质说明','Credential note')}</option></select>}</div>
    <div onClickCapture={e=>{if((e.target as HTMLElement).closest('a'))e.preventDefault()}} onSubmitCapture={e=>e.preventDefault()}>
      <Header locale={locale}/>
      {type==='content'?<main id="main"><EntryDetail found={entry} locale={locale} entries={entries}/></main>:view==='home'?<HomeView locale={locale} entries={entries} settings={liveSettings}/>:<main className="container section" id="main">{view==='contact'?<><h1>{t(locale,'联系匡集','Contact KUANKI')}</h1><div className="contact-details"><p>{liveSettings.email}</p><p>{liveSettings.phone}</p><p>{liveSettings.address}</p></div></>:<><h1>{t(locale,'资质与认证','Credentials')}</h1><p className="credential-note">{liveSettings.certificateNote}</p></>}</main>}
      <Footer locale={locale} settings={liveSettings}/>
    </div></>
}
