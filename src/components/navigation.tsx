'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { navigation, t, type Locale } from '@/lib/content'
export function Header({locale}:{locale:Locale}) {
  const path=usePathname(); const [open,setOpen]=useState(false)
  useEffect(()=>{try{const q=new URLSearchParams(window.location.search);if(!sessionStorage.getItem('kuanki-source')||q.has('utm_source'))sessionStorage.setItem('kuanki-source',JSON.stringify({landing:window.location.pathname,utmSource:q.get('utm_source')||'',utmMedium:q.get('utm_medium')||'',utmCampaign:q.get('utm_campaign')||''}))}catch{}},[path])
  const other=locale==='zh'?'en':'zh'
  const switchPath=path.replace(/^\/(zh|en)(?=\/|$)/,'/'+other)
  return <header className="site-header"><div className="container header-row">
    <Link className="brand" href={'/'+locale} aria-label={t(locale,'匡集首页','KUANKI home')} onClick={()=>setOpen(false)}><Image src="/brand/logo.svg" width={40} height={38} alt=""/><span>KUANKI<small>{t(locale,'匡集工业科技','INDUSTRY & TECHNOLOGY')}</small></span></Link>
    <nav className="desktop-nav" aria-label={t(locale,'主导航','Main navigation')}>{navigation.map(([url,zh,en])=><Link key={url} href={'/'+locale+'/'+url} aria-current={path.includes('/'+url)?'page':undefined}>{t(locale,zh,en)}</Link>)}</nav>
    <div className="header-actions"><Link className="language" href={switchPath} hrefLang={other}>{other==='en'?'EN':'中文'}</Link><Link className="contact-link" href={'/'+locale+'/contact'}>{t(locale,'项目咨询','Talk to us')} <span aria-hidden>↗</span></Link><button className="menu-button" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={t(locale,'切换菜单','Toggle menu')}>{open?'✕':'☰'}</button></div>
    {open&&<nav id="mobile-nav" className="mobile-nav" aria-label={t(locale,'移动导航','Mobile navigation')}>{navigation.map(([url,zh,en])=><Link key={url} href={'/'+locale+'/'+url} onClick={()=>setOpen(false)}>{t(locale,zh,en)}<span aria-hidden>↗</span></Link>)}</nav>}</div></header>
}
