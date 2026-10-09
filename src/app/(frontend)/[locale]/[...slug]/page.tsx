import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { EntryCard, CTA, SectionLabel, Arrow } from '@/components/site-parts'
import { EngineeringScene } from '@/components/engineering-scene'
import { InquiryForm } from '@/components/inquiry-form'
import { getEntries, getSettings } from '@/lib/cms'
import { company, labels, t, type Locale, type Kind } from '@/lib/content'
import { metadata, jsonLd, siteURL } from '@/lib/site'
type Props={params:Promise<{locale:Locale;slug:string[]}>;searchParams:Promise<{q?:string;division?:string}>}
const special:Record<string,[string,string]>={about:['关于匡集','About KUANKI'],contact:['项目咨询','Discuss your project'],privacy:['隐私说明','Privacy notice']}
function titleFor(key:string,locale:Locale){const name=labels[key as Kind]||special[key];return name?name[locale==='zh'?0:1]:''}
export async function generateMetadata({params}:Props){
  const {locale,slug}=await params
  if(!['zh','en'].includes(locale))return {}
  const entries=await getEntries(locale)
  const found=slug.length===2?entries.find(e=>e.kind===slug[0]&&e.id===slug[1]):undefined
  const title=found?.seoTitle||found?.title||titleFor(slug[0],locale)
  return metadata(locale,'/'+slug.join('/'),title,found?.seoDescription||found?.intro||t(locale,title+'，了解匡集工业科技的产品、系统方案与工程能力。',title+' — explore KUANKI products, system solutions and engineering capabilities.'))
}
export default async function Page({params,searchParams}:Props){
  const {locale,slug}=await params
  if(!['zh','en'].includes(locale)||slug.length>2)notFound()
  const section=slug[0];const entries=await getEntries(locale);const settings=await getSettings(locale)
  const found=slug.length===2?entries.find(e=>e.kind===section&&e.id===slug[1]):undefined
  if((slug.length===2&&!found)||(!labels[section as Kind]&&!special[section]))notFound()
  const heading=found?.title||titleFor(section,locale)
  const breadcrumbs=[{'@type':'ListItem',position:1,name:t(locale,'首页','Home'),item:siteURL()+'/'+locale},{'@type':'ListItem',position:2,name:titleFor(section,locale),item:siteURL()+'/'+locale+'/'+section},...(found?[{'@type':'ListItem',position:3,name:found.title,item:siteURL()+'/'+locale+'/'+section+'/'+found.id}]:[])]
  const listIntro:Record<string,[string,string]>={
    divisions:['从制造到系统设计，以三大专业方向服务工业运行。','Three complementary disciplines, from manufacturing to system design.'],
    products:['围绕物料输送、气体分配与循环水运行，匹配项目所需的产品与服务。','Products and services for material handling, gas distribution and circulating water systems.'],
    industries:['理解行业场景，梳理技术接口，与项目团队共同推进实施。','Understanding applications and technical interfaces to support project teams.'],
    cases:['通过项目背景、技术方案与实施结果，了解匡集的项目经验。','Explore project backgrounds, solutions and documented outcomes.'],
    resources:['选型指南、项目准备清单与技术交流资料。','Selection guides, project checklists and technical insights.'],
    certifications:['以企业资质与质量管理，建立长期合作的信任基础。','Corporate credentials and quality management supporting lasting partnerships.'],
  }
  return <main id="main"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumbs})}}/>
    <div className="container breadcrumbs"><Link href={'/'+locale}>{t(locale,'首页','Home')}</Link><span>/</span>{found?<><Link href={'/'+locale+'/'+section}>{titleFor(section,locale)}</Link><span>/</span><span>{heading}</span></>:<span>{heading}</span>}</div>
    {found?<><section className="container detail-hero"><div><SectionLabel>{found.tag}</SectionLabel><h1>{found.title}</h1><p>{found.intro}</p><Button asChild><Link href={'/'+locale+'/contact?source='+encodeURIComponent('/'+locale+'/'+section+'/'+found.id)}>{t(locale,'咨询相关项目','Discuss a related project')}<Arrow/></Link></Button></div>{found.image?<Image className="detail-photo" src={found.image} alt={found.imageAlt||found.title} width={720} height={540} unoptimized/>:<EngineeringScene type={found.division||found.id}/>}</section>
      <section className="container section detail-body"><aside><p className="eyebrow">{t(locale,'内容导览','ON THIS PAGE')}</p>{found.sections.map((s,i)=><a href={'#section-'+i} key={i}>{s.title}</a>)}<Link className="text-link" href={'/'+locale+'/contact'}>{t(locale,'联系匡集','Contact KUANKI')}<Arrow/></Link></aside><div>{found.sections.map((s,i)=><section id={'section-'+i} className="content-section" key={i}><span className="eyebrow">0{i+1}</span><h2>{s.title}</h2><p>{s.text}</p></section>)}</div></section>
      {section==='divisions'&&<section className="section container"><SectionLabel>PRODUCTS & SERVICES</SectionLabel><h2>{t(locale,'相关产品与服务','Related products & services')}</h2><div className="card-grid spaced">{entries.filter(e=>e.kind==='products'&&e.division===found.id).map((e,i)=><EntryCard entry={e} locale={locale} index={i} key={e.id}/>)}</div></section>}
      {found.downloadURL&&<div className="container related-link"><a className="text-link" href={found.downloadURL} target="_blank" rel="noopener noreferrer">{t(locale,'查看与下载资料','View & download document')}<Arrow/></a></div>}
      {section!=='divisions'&&found.division&&<div className="container related-link"><Link className="text-link" href={'/'+locale+'/divisions/'+found.division}>{t(locale,'了解所属事业部','Explore the division')}<Arrow/></Link></div>}
      {section==='resources'&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'Article',headline:found.title,description:found.intro,author:{'@type':'Organization',name:company[locale]},mainEntityOfPage:siteURL()+'/'+locale+'/resources/'+found.id})}}/>}
      <CTA locale={locale}/></>
    :section==='about'?<>
      <section className="container page-intro"><SectionLabel>ABOUT KUANKI</SectionLabel><h1>{t(locale,'专注工业，\n连接更高效的未来。','Industrial expertise.\nConnected thinking.')}</h1><p>{company[locale]}</p></section>
      <section className="about-feature"><div className="container split"><EngineeringScene type="gas-systems"/><div><SectionLabel>MANUFACTURING + ENGINEERING</SectionLabel><h2>{t(locale,'以专业能力，回应真实需求。','Real expertise. Real requirements.')}</h2><p>{t(locale,'江苏匡集工业科技有限公司聚焦传动输送、空分流体与循环水处理三大业务，围绕设备制造、系统设计和运行优化，为工业客户提供产品与解决方案。','KUANKI brings together conveying and transmission, central gas supply and circulating water treatment. We serve industrial customers through equipment manufacturing, system design and operational improvement.')}</p><p>{t(locale,'我们重视精益化生产管理、专业团队协同和项目方案设计，与客户共同明确技术需求、实施边界和评价目标。','Our approach emphasizes lean production management, team coordination and project-specific design, with clearly defined technical requirements, delivery boundaries and evaluation objectives.')}</p><Link className="text-link" href={'/'+locale+'/certifications'}>{t(locale,'查看企业资质','View credentials')}<Arrow/></Link></div></div></section>
      <section className="section container"><div className="section-heading"><div><SectionLabel>HOW WE WORK</SectionLabel><h2>{t(locale,'合作，始于充分理解。','A clear path to collaboration.')}</h2></div></div><div className="process-grid">{[
        [t(locale,'了解需求','Understand'),t(locale,'收集应用场景、工况与项目目标。','Review applications, conditions and objectives.')],
        [t(locale,'技术交流','Develop'),t(locale,'对接技术接口，讨论产品与系统方案。','Align interfaces, products and system solutions.')],
        [t(locale,'协同实施','Coordinate'),t(locale,'明确范围、质量要求与交付安排。','Define scope, quality requirements and delivery.')],
        [t(locale,'关注运行','Evaluate'),t(locale,'结合实际项目，交流运行与改进需求。','Discuss operation and improvement needs in context.')],
      ].map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><CTA locale={locale}/></>
    :section==='contact'?<section className="container contact-page"><div className="contact-copy"><SectionLabel>LET’S BUILD A CONNECTION</SectionLabel><h1>{t(locale,'谈谈您的\n下一个项目。','Let’s discuss\nyour next project.')}</h1><p>{t(locale,'告诉我们您的应用场景与项目需求，我们将据此匹配对应的专业方向。','Tell us about your application and requirements so we can connect you with the right expertise.')}</p><div className="contact-details"><strong>{company[locale]}</strong>{settings.email&&<a href={'mailto:'+settings.email}>{settings.email}</a>}{settings.phone&&<a href={'tel:'+settings.phone}>{settings.phone}</a>}{settings.address&&<p>{settings.address}</p>}</div><p className="eyebrow">CONVEYING / GAS / WATER</p></div><div className="form-panel"><h2>{t(locale,'项目需求表','Project inquiry')}</h2><p>{t(locale,'标有 * 的项目为必填项。','Fields marked * are required.')}</p><InquiryForm locale={locale}/></div></section>
    :section==='privacy'?<section className="container section prose-page"><SectionLabel>PRIVACY</SectionLabel><h1>{heading}</h1>{[
      [t(locale,'我们收集什么','What we collect'),t(locale,'当您提交项目咨询时，我们收集您填写的姓名、企业、邮箱、国家或地区、可选电话和项目需求，以及页面语言、来源页面和推广标识。系统使用经哈希处理的网络来源标识限制垃圾提交。','When you submit an inquiry, we collect your name, company, email, country or region, optional phone and project requirements, together with page language, source page and campaign identifiers. A hashed network identifier helps limit spam.')],
      [t(locale,'如何使用','How information is used'),t(locale,'这些信息用于回复咨询、分配项目跟进和了解咨询来源，不会在公开网站展示。本版本未接入第三方广告追踪或行为分析脚本。','Information is used to respond to inquiries, assign follow-up and understand inquiry sources. It is not displayed publicly. This version does not load third-party advertising or behavioral analytics scripts.')],
      [t(locale,'管理您的信息','Managing your information'),t(locale,'您可通过网站公布的企业联系方式或项目咨询渠道提出查询、更正或删除请求。正式上线前将根据实际托管区域、运营流程和保留期限完善本说明。','You may request access, correction or deletion through the company contact details published on this site or the inquiry channel. Before production launch, this notice will be completed for the actual hosting regions, operational processes and retention periods.')],
    ].map(([title,text])=><section className="content-section" key={title}><h2>{title}</h2><p>{text}</p></section>)}</section>
    :<><section className="container page-intro"><SectionLabel>{section.toUpperCase()}</SectionLabel><h1>{heading}</h1><p>{t(locale,...listIntro[section])}</p></section>
      {section==='certifications'&&<section className="container credentials-grid">{[
        ['HIGH-TECH',t(locale,'国家高新技术企业','National high-tech enterprise'),t(locale,'中国国家高新技术企业认定','High-tech enterprise recognition in China')],
        ['ISO 9001',t(locale,'质量管理体系认证','Quality management certification'),t(locale,'以质量管理支撑产品与服务','Quality management supporting products and services')],
        ['656681',t(locale,'新四板挂牌','Regional equity market listing'),t(locale,'挂牌代码：656681','Listing code: 656681')],
      ].map(([number,title,desc])=><article key={number}><div className="credential-emblem">{number}</div><h2>{title}</h2><p>{desc}</p></article>)}<p className="credential-note">{settings.certificateNote||t(locale,'以上企业信息由公司提供。证书影像、认证范围与挂牌市场资料将在核对后补充。','Corporate information is supplied by KUANKI. Certificate images, certification scope and market details will be added after verification.')}</p></section>}
      {section==='divisions'&&<div className="container subnav"><Link href={'/'+locale+'/products'}>{t(locale,'浏览全部产品与服务','Browse all products & services')}<Arrow/></Link></div>}
      {section==='products'&&<form className="container filter-bar" method="get"><input aria-label={t(locale,'搜索产品','Search products')} name="q" placeholder={t(locale,'搜索产品与服务…','Search products & services…')} defaultValue={(await searchParams).q||''}/><select name="division" aria-label={t(locale,'按事业部筛选','Filter by division')} defaultValue={(await searchParams).division||''}><option value="">{t(locale,'全部事业部','All divisions')}</option>{entries.filter(e=>e.kind==='divisions').map(e=><option value={e.id} key={e.id}>{e.title}</option>)}</select><Button type="submit">{t(locale,'筛选','Filter')}</Button></form>}
      <section className="section container listing-section">{await (async()=>{
        const query=await searchParams
        const list=entries.filter(e=>e.kind===section&&(!query.q||(e.title+' '+e.intro).toLowerCase().includes(query.q.toLowerCase()))&&(!query.division||e.division===query.division))
        return list.length?<div className="card-grid">{list.map((e,i)=><EntryCard key={e.id} entry={e} locale={locale} index={i}/>)}</div>:section==='certifications'?null:<div className="empty-state"><span className="eyebrow">{section==='cases'?'PROJECT EXPERIENCE':'KUANKI'}</span><h2>{section==='cases'?t(locale,'每个项目，都值得认真讲述。','Every project deserves a clear story.'):t(locale,'暂未找到匹配内容','No matching content')}</h2><p>{section==='cases'?t(locale,'可公开的项目资料正在整理。欢迎与我们沟通相似工况及具体项目需求。','Approved project materials are being prepared. Contact us to discuss comparable operating conditions and your project requirements.'):t(locale,'请调整筛选条件，或直接联系技术团队。','Try another filter or contact our team.')}</p><Link className="text-link" href={'/'+locale+'/contact'}>{t(locale,'交流项目需求','Discuss your requirements')}<Arrow/></Link></div>
      })()}</section><CTA locale={locale}/></>}
  </main>
}
