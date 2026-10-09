import { NextResponse } from 'next/server'
import { createHmac } from 'node:crypto'
import { cms, cmsEnabled } from '@/lib/cms'
export const runtime='nodejs'
export async function POST(request:Request) {
  if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({error:'Unsupported content type'},{status:415})
  const declared=Number(request.headers.get('content-length')||0)
  if(declared>20000)return NextResponse.json({error:'Request too large'},{status:413})
  const origin=request.headers.get('origin')
  const allowed=process.env.NEXT_PUBLIC_SERVER_URL
  if(origin&&allowed&&origin!==new URL(allowed).origin)return NextResponse.json({error:'Invalid origin'},{status:403})
  let data:Record<string,unknown>
  try { const text=await request.text();if(text.length>20000)return NextResponse.json({error:'Request too large'},{status:413});data=JSON.parse(text);if(!data||typeof data!=='object'||Array.isArray(data))throw Error() }
  catch{return NextResponse.json({error:'Invalid request'},{status:400})}
  if(data.website)return NextResponse.json({ok:true})
  const clean=(key:string,max:number)=>typeof data[key]==='string'?(data[key] as string).trim().slice(0,max):''
  const name=clean('name',120),company=clean('company',120),email=clean('email',254),country=clean('country',120),message=clean('message',5000),division=clean('division',30),submissionId=clean('submissionId',36)
  if(!name||!company||!country||!/^\S+@\S+\.\S+$/.test(email)||message.length<10||data.consent!==true||!['conveying','gas-systems','water-treatment','other'].includes(division)||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId))return NextResponse.json({error:'Please check the required fields'},{status:400})
  if(!cmsEnabled()||!process.env.PAYLOAD_SECRET)return NextResponse.json({error:'Inquiry storage is not configured'},{status:503})
  try{
    const payload=await cms()
    const duplicate=await payload.count({collection:'inquiries',overrideAccess:true,where:{submissionId:{equals:submissionId}}})
    if(duplicate.totalDocs)return NextResponse.json({ok:true})
    // Production reverse proxy must overwrite forwarding headers. Email adds an independent limit.
    const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown'
    const clientHash=createHmac('sha256',process.env.PAYLOAD_SECRET).update(ip).digest('hex')
    const since=new Date(Date.now()-15*60*1000).toISOString()
    const recent=await payload.count({collection:'inquiries',overrideAccess:true,where:{and:[{createdAt:{greater_than:since}},{or:[{clientHash:{equals:clientHash}},{email:{equals:email}}]}]}})
    if(recent.totalDocs>=5)return NextResponse.json({error:'Please try later'},{status:429,headers:{'Retry-After':'900'}})
    await payload.create({collection:'inquiries',overrideAccess:true,data:{name,company,email,country,message,division,submissionId,consent:true,phone:clean('phone',50),locale:data.locale==='en'?'en':'zh',source:clean('source',250),utmSource:clean('utmSource',150),utmMedium:clean('utmMedium',150),utmCampaign:clean('utmCampaign',150),clientHash,status:'new'}})
    return NextResponse.json({ok:true},{status:201})
  }catch(error){console.error('Inquiry persistence failed',error instanceof Error?error.name:'Error');return NextResponse.json({error:'Unable to save request'},{status:503})}
}

