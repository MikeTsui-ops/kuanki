import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
const base='http://localhost:3000'
for(const path of ['/zh','/en','/zh/divisions','/en/products','/zh/industries','/zh/certifications','/zh/cases','/en/resources/gas-system-planning','/zh/contact','/en/privacy']){
 const r=await fetch(base+path);assert.equal(r.status,200,path);const html=await r.text();assert.ok(html.includes('<h1'),path);assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow, noarchive')
}
assert.equal((await fetch(base+'/zh/not-a-page')).status,404)
const submit=body=>fetch(base+'/api/inquiry',{method:'POST',headers:{'content-type':'application/json',origin:base},body:JSON.stringify(body)})
assert.equal((await submit({name:'Invalid'})).status,400)
const body={name:'CI Test',company:'Integration test',email:randomUUID()+'@example.invalid',country:'Test',division:'conveying',message:'Automated integration verification only.',consent:true,locale:'en',submissionId:randomUUID(),source:'/en/contact'}
assert.equal((await submit(body)).status,201)
assert.equal((await submit(body)).status,200)
const privateRead=await fetch(base+'/api/inquiries')
assert.ok([401,403].includes(privateRead.status))
console.log('PASS: bilingual routes, 404, preview noindex, persisted inquiry, idempotent retry and private inquiry access.')

