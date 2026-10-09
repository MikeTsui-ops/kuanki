import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const payload=await getPayload({config})
const id=randomUUID()
const ids:{users:(string|number)[];content:(string|number)[]}={users:[],content:[]}
try{
  const user=await payload.create({collection:'users',data:{email:id+'@example.invalid',password:randomUUID()+'aA1!',role:'editor'},overrideAccess:true})
  ids.users.push(user.id)
  const editor={...user,role:'editor',collection:'users' as const}
  await assert.rejects(()=>payload.create({collection:'users',data:{email:'blocked-'+id+'@example.invalid',password:randomUUID()},user:editor,overrideAccess:false}))
  await assert.rejects(()=>payload.updateGlobal({slug:'site-settings',data:{phone:'blocked'},user:editor,overrideAccess:false}))
  const doc=await payload.create({collection:'content',locale:'zh',data:{kind:'resources',slug:'check-'+id,title:'测试草稿',intro:'测试内容',sections:[{title:'说明',text:'草稿不可公开'}],_status:'draft'},overrideAccess:true})
  ids.content.push(doc.id)
  const privateRead=await payload.find({collection:'content',where:{id:{equals:doc.id}},overrideAccess:false})
  assert.equal(privateRead.totalDocs,0)
  await payload.update({collection:'content',id:doc.id,locale:'en',data:{title:'Integration check',intro:'Published English content',_status:'published'},overrideAccess:true})
  const publicRead=await payload.find({collection:'content',locale:'en',fallbackLocale:false,where:{id:{equals:doc.id}},overrideAccess:false})
  assert.equal(publicRead.docs[0]?.title,'Integration check')
  const zh=await payload.findByID({collection:'content',id:doc.id,locale:'zh',overrideAccess:false})
  assert.equal(zh.title,'测试草稿')
  console.log('PASS: draft visibility, bilingual publishing, editor account restrictions and settings permissions.')
}finally{
  for(const value of ids.content)await payload.delete({collection:'content',id:value,overrideAccess:true})
  for(const value of ids.users)await payload.delete({collection:'users',id:value,overrideAccess:true})
  await payload.destroy()
}

