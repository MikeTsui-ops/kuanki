import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { EngineeringScene } from '@/components/engineering-scene'
import { CTA, SectionLabel, EntryCard, Arrow } from '@/components/site-parts'
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
  const divisions=entries.filter(e=>e.kind==='divisions')
  const articles=entries.filter(e=>e.kind==='resources').slice(0,3)
  const industries=entries.filter(e=>e.kind==='industries')
  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'Organization',name:company[locale],alternateName:'KUANKI',url:siteURL()+'/'+locale,logo:siteURL()+'/brand/logo.svg',...(settings.email?{email:settings.email}:{})})}}/>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><SectionLabel>ENGINEERING FOR INDUSTRY</SectionLabel><h1>{settings.headline||t(locale,'可靠连接，\n高效运行。','Reliable connections.\nEfficient operations.')}</h1><p>{settings.intro||t(locale,'以精益制造与专业工程能力，连接物料、气体与水。匡集，为工业系统的每一步运行创造价值。','Precision manufacturing and engineering expertise across materials, gases and water. KUANKI helps industrial systems work better.')}</p><div className="hero-actions"><Button asChild><Link href={'/'+locale+'/divisions'}>{t(locale,'探索三大业务','Explore our expertise')}<Arrow/></Link></Button><Link className="text-link" href={'/'+locale+'/contact'}>{t(locale,'与我们交流','Start a conversation')}<Arrow/></Link></div><div className="hero-caption"><span>01 — 03</span><span>{t(locale,'制造实力 × 工程思维','MANUFACTURING × ENGINEERING')}</span></div></div><div className="hero-art"><EngineeringScene/><div className="art-caption"><span>01 / CONVEYING SYSTEMS</span><span>{t(locale,'工业系统概念示意','ENGINEERING VISUALIZATION')}</span></div></div></div></section>
    <section className="trust-bar"><div className="container trust-grid"><div><strong>{t(locale,'国家高新技术企业','High-tech enterprise')}</strong><span>{t(locale,'以技术驱动发展','Recognized in China')}</span></div><div><strong>ISO 9001</strong><span>{t(locale,'质量管理体系认证','Quality management certification')}</span></div><div><strong>656681</strong><span>{t(locale,'新四板挂牌代码','Regional equity market code')}</span></div><Link href={'/'+locale+'/certifications'}>{t(locale,'了解匡集资质','Explore our credentials')}<Arrow/></Link></div></section>
    <section className="section container"><div className="section-heading"><div><SectionLabel>OUR EXPERTISE</SectionLabel><h2>{t(locale,'三大业务，\n同一种专业精神。','Three disciplines.\nOne commitment.')}</h2></div><p>{t(locale,'从核心部件到系统方案，围绕真实工况，提供适合项目的产品与技术支持。','From core components to engineered systems, our work starts with your operating conditions.')}</p></div><div className="card-grid">{divisions.map((e,i)=><EntryCard key={e.id} entry={e} locale={locale} index={i}/>)}</div></section>
    <section className="industry-section"><div className="container industry-grid"><div><SectionLabel>INDUSTRIES WE SERVE</SectionLabel><h2>{t(locale,'深入行业，\n理解每一种需求。','Industry insight.\nPractical solutions.')}</h2><p>{t(locale,'面向工业企业、设计团队与工程总包方，从应用场景出发，协同技术接口与项目交付。','Working with industrial owners, design teams and EPC contractors to align applications, interfaces and delivery.')}</p><Link className="text-link" href={'/'+locale+'/industries'}>{t(locale,'全部行业方案','All industries')}<Arrow/></Link></div><div className="industry-list">{industries.slice(0,6).map((e,i)=><Link key={e.id} href={'/'+locale+'/industries/'+e.id}><span>0{i+1}</span><strong>{e.title}</strong><Arrow/></Link>)}</div></div></section>
    <section className="section container"><div className="about-strip"><div><SectionLabel>WHY KUANKI</SectionLabel><h2>{t(locale,'让专业，\n落实到每个环节。','Expertise in\nevery detail.')}</h2><Link className="text-link" href={'/'+locale+'/about'}>{t(locale,'认识匡集','Meet KUANKI')}<Arrow/></Link></div><div className="principles">{[
      [t(locale,'精益制造','Lean manufacturing'),t(locale,'重视生产组织、过程控制与交付协同。','Focused production, process control and coordinated delivery.')],
      [t(locale,'专业设计','Engineering expertise'),t(locale,'围绕工况与接口，梳理完整的系统需求。','Understanding operating conditions and system interfaces.')],
      [t(locale,'面向长期运行','Long-term operation'),t(locale,'关注质量、效率与资源利用，结合项目数据评价效果。','A focus on quality, efficiency and resource use, evaluated against project data.')],
    ].map(([title,body],i)=><div key={title}><span className="principle-index">0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div></div></section>
    <section className="section insights-section"><div className="container"><div className="section-heading"><div><SectionLabel>KNOWLEDGE & INSIGHTS</SectionLabel><h2>{t(locale,'从技术交流开始。','Better questions. Better projects.')}</h2></div><Link className="text-link" href={'/'+locale+'/resources'}>{t(locale,'浏览技术资料','Explore insights')}<Arrow/></Link></div><div className="article-grid">{articles.map((e,i)=><Link className="article-card" key={e.id} href={'/'+locale+'/resources/'+e.id}><span className="article-index">0{i+1}</span><p className="eyebrow">{e.tag}</p><h3>{e.title}</h3><p>{e.intro}</p><span className="text-link">{t(locale,'阅读指南','Read the guide')}<Arrow/></span></Link>)}</div></div></section>
    <CTA locale={locale}/>
  </main>
}

