import { getPayload } from 'payload'
import config from '../src/payload.config'
import { initialContent } from '../src/lib/content'
const payload=await getPayload({config})
let created=0
for(const base of initialContent('zh')){
  const existing=await payload.find({collection:'content',where:{slug:{equals:base.id}},limit:1,overrideAccess:true})
  if(existing.totalDocs)continue
  const en=initialContent('en').find(e=>e.id===base.id)!
  const doc=await payload.create({collection:'content',locale:'zh',overrideAccess:true,data:{kind:base.kind,slug:base.id,title:base.title,intro:base.intro,tag:base.tag,division:base.division as 'conveying'|'gas-systems'|'water-treatment'|undefined,sections:base.sections,_status:'draft'}})
  await payload.update({collection:'content',id:doc.id,locale:'en',overrideAccess:true,data:{title:en.title,intro:en.intro,tag:en.tag,sections:en.sections,_status:'published'}})
  created++
}
console.log('Bilingual baseline entries created:',created,'; existing content was preserved.')
await payload.destroy()
