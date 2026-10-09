import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { t, navigation, type Entry, type Locale } from '@/lib/content'
import type { SiteSettings } from '@/lib/cms'
import { EngineeringScene } from './engineering-scene'
export function Arrow(){return <span aria-hidden="true">↗</span>}
export function SectionLabel({children}:{children:React.ReactNode}){return <p className="eyebrow"><span/>{children}</p>}
export function EntryCard({entry,locale,index=0}:{entry:Entry;locale:Locale;index?:number}){
  return <Link href={'/'+locale+'/'+entry.kind+'/'+entry.id} className="entry-card">
    <div className="card-art">{entry.image?<Image src={entry.image} alt={entry.imageAlt||entry.title} width={720} height={540} unoptimized/>:<EngineeringScene type={entry.division||entry.id} compact/>}<span className="card-number">0{index+1}</span></div>
    <div className="card-copy"><p className="eyebrow">{entry.tag}</p><h3>{entry.title}<Arrow/></h3><p>{entry.intro}</p></div>
  </Link>
}
export function CTA({locale}:{locale:Locale}){return <section className="cta-band"><div className="container cta-inner"><div><SectionLabel>{t(locale,'与匡集一起，推进您的下一个项目','LET’S DISCUSS YOUR NEXT PROJECT')}</SectionLabel><h2>{t(locale,'从一个需求，开始合作。','A conversation. A better solution.')}</h2></div><Button asChild><Link href={'/'+locale+'/contact'}>{t(locale,'联系技术团队','Discuss your project')} <Arrow/></Link></Button></div></section>}
export function Footer({locale,settings}:{locale:Locale;settings:SiteSettings}){
  return <footer className="footer"><div className="container"><div className="footer-main"><div><Link href={'/'+locale} className="footer-brand">KUANKI</Link><p>{t(locale,'江苏匡集工业科技有限公司','Jiangsu Kuanki Industry&Technology Co., Ltd')}</p><p className="footer-note">{t(locale,'传动输送 · 空分流体 · 循环水处理','Conveying · Gas systems · Water treatment')}</p></div><div className="footer-links">{navigation.map(([url,zh,en])=><Link key={url} href={'/'+locale+'/'+url}>{t(locale,zh,en)}</Link>)}</div><div className="footer-links"><Link href={'/'+locale+'/certifications'}>{t(locale,'资质与认证','Credentials')}</Link><Link href={'/'+locale+'/contact'}>{t(locale,'项目咨询','Contact')}</Link>{settings.email&&<a href={'mailto:'+settings.email}>{settings.email}</a>}{settings.phone&&<a href={'tel:'+settings.phone}>{settings.phone}</a>}</div></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} KUANKI</span><span>{t(locale,'新四板挂牌代码','Regional equity market code')} 656681</span><Link href={'/'+locale+'/privacy'}>{t(locale,'隐私说明','Privacy notice')}</Link></div></div></footer>
}
