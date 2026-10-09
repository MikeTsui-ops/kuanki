'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { t, type Locale } from '@/lib/content'
export function InquiryForm({locale}:{locale:Locale}) {
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle')
  const [error,setError]=useState('')
  const submission=useRef('')
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();if(status==='sending')return
    const form=event.currentTarget;const data=new FormData(form)
    if(!submission.current)submission.current=crypto.randomUUID()
    setStatus('sending');setError('')
    const query=new URLSearchParams(window.location.search)
    let attribution:Record<string,string>={}
    try{attribution=JSON.parse(sessionStorage.getItem('kuanki-source')||'{}')}catch{}
    try {
      const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        ...Object.fromEntries(data),consent:data.get('consent')==='on',locale,submissionId:submission.current,
        source:query.get('source')||attribution.landing||window.location.pathname,
        utmSource:query.get('utm_source')||attribution.utmSource||'',utmMedium:query.get('utm_medium')||attribution.utmMedium||'',utmCampaign:query.get('utm_campaign')||attribution.utmCampaign||'',
      })})
      if(!response.ok)throw new Error(response.status===429?t(locale,'提交较频繁，请稍后再试。','Too many requests. Please try again later.'):t(locale,'暂时无法保存需求，请稍后重试。您填写的内容已保留。','We could not save your request. Please try again; your details are retained.'))
      setStatus('success');form.reset();submission.current=''
      window.dispatchEvent(new CustomEvent('kuanki:inquiry-submitted',{detail:{locale,division:data.get('division')}}))
    }catch(e){setStatus('error');setError(e instanceof Error?e.message:'Please try again.')}
  }
  if(status==='success')return <div className="form-success" role="status"><span>✓</span><h2>{t(locale,'您的项目需求已提交。','Your request has been received.')}</h2><p>{t(locale,'需求已保存至匡集项目咨询后台。','Your request has been saved in our project inquiry system.')}</p><Button variant="outline" onClick={()=>setStatus('idle')}>{t(locale,'提交另一项需求','Submit another request')}</Button></div>
  return <form onSubmit={submit} className="inquiry-form"><div className="form-grid">
    {[['name','您的姓名','Name','text','name'],['company','公司名称','Company','text','organization'],['email','工作邮箱','Work email','email','email'],['country','国家 / 地区','Country / region','text','country-name']].map(([name,zh,en,type,auto])=><label key={name}>{t(locale,zh,en)} <span>*</span><input name={name} type={type} autoComplete={auto} required maxLength={name==='email'?254:120}/></label>)}
    <label>{t(locale,'联系电话（选填）','Phone (optional)')}<input name="phone" type="tel" autoComplete="tel" maxLength={50}/></label>
    <label>{t(locale,'业务方向','Area of interest')} <span>*</span><select name="division" required defaultValue=""><option value="" disabled>{t(locale,'请选择','Please select')}</option><option value="conveying">{t(locale,'传动输送','Conveying')}</option><option value="gas-systems">{t(locale,'集中供气','Gas systems')}</option><option value="water-treatment">{t(locale,'循环水处理','Water treatment')}</option><option value="other">{t(locale,'综合项目 / 其他','Integrated project / other')}</option></select></label>
  </div><label>{t(locale,'项目需求','Project requirements')} <span>*</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={t(locale,'请介绍应用场景、项目阶段与主要技术需求（至少10个字符）。','Describe your application, project stage and technical requirements (at least 10 characters).')}/></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="consent"><input name="consent" type="checkbox" required/><span>{t(locale,'我已阅读','I have read the')} <Link href={'/'+locale+'/privacy'} target="_blank">{t(locale,'隐私说明','privacy notice')}</Link>{t(locale,'，同意为回复此项目咨询处理我提供的信息。',' and agree to the use of my information to respond to this project inquiry.')}</span></label>
    {status==='error'&&<p role="alert" className="form-error">{error}</p>}
    <Button disabled={status==='sending'} type="submit">{status==='sending'?t(locale,'正在提交…','Submitting…'):t(locale,'提交项目需求','Send project request')} <span aria-hidden>↗</span></Button>
    <p className="form-note">{t(locale,'请勿提交密码、商业机密或未经授权的客户资料。','Please do not include passwords, trade secrets or unauthorized third-party information.')}</p>
  </form>
}
