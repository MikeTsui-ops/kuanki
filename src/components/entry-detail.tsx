import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { EntryCard, CTA, SectionLabel, Arrow } from '@/components/site-parts'
import { EngineeringScene } from '@/components/engineering-scene'
import { t, type Locale, type Entry } from '@/lib/content'
export function EntryDetail({found,locale,entries}:{found:Entry;locale:Locale;entries:Entry[]}) {
 const section=found.kind
 return <><section className="container detail-hero"><div><SectionLabel>{found.tag}</SectionLabel><h1>{found.title}</h1><p>{found.intro}</p><Button asChild><Link href={'/'+locale+'/contact?source='+encodeURIComponent('/'+locale+'/'+section+'/'+found.id)}>{t(locale,'咨询相关项目','Discuss a related project')}<Arrow/></Link></Button></div>{found.image?<Image className="detail-photo" src={found.image} alt={found.imageAlt||found.title} width={720} height={540} unoptimized/>:<EngineeringScene type={found.division||found.id}/>}</section>
      <section className="container section detail-body"><aside><p className="eyebrow">{t(locale,'内容导览','ON THIS PAGE')}</p>{found.sections.map((s,i)=><a href={'#section-'+i} key={i}>{s.title}</a>)}<Link className="text-link" href={'/'+locale+'/contact'}>{t(locale,'联系匡集','Contact KUANKI')}<Arrow/></Link></aside><div>{found.sections.map((s,i)=><section id={'section-'+i} className="content-section" key={i}><span className="eyebrow">0{i+1}</span><h2>{s.title}</h2><p>{s.text}</p></section>)}</div></section>
      {section==='divisions'&&<section className="section container"><SectionLabel>PRODUCTS & SERVICES</SectionLabel><h2>{t(locale,'相关产品与服务','Related products & services')}</h2><div className="card-grid spaced">{entries.filter(e=>e.kind==='products'&&e.division===found.id).map((e,i)=><EntryCard entry={e} locale={locale} index={i} key={e.id}/>)}</div></section>}
      {found.downloadURL&&<div className="container related-link"><a className="text-link" href={found.downloadURL} target="_blank" rel="noopener noreferrer">{t(locale,'查看与下载资料','View & download document')}<Arrow/></a></div>}
      {section!=='divisions'&&found.division&&<div className="container related-link"><Link className="text-link" href={'/'+locale+'/divisions/'+found.division}>{t(locale,'了解所属事业部','Explore the division')}<Arrow/></Link></div>}
      <CTA locale={locale}/></>
}
