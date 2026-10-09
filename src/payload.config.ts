import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig, type Access, type CollectionConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const staff: Access = ({ req }) => Boolean(req.user)
const admin: Access = ({ req }) => req.user?.role === 'admin'
const published: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } }
const Users: CollectionConfig = {
  slug:'users',auth:true,admin:{useAsTitle:'email'},
  access:{create:admin,read:({req})=>req.user?.role==='admin'?true:req.user?{id:{equals:req.user.id}}:false,update:({req})=>req.user?.role==='admin'?true:req.user?{id:{equals:req.user.id}}:false,delete:admin},
  hooks:{beforeChange:[async({data,operation,req})=>{
    if(operation==='create'){
      const {totalDocs}=await req.payload.count({collection:'users',overrideAccess:true,req})
      if(totalDocs===0)data.role='admin'
    }
    return data
  }]},
  fields:[{name:'role',type:'select',options:['admin','editor'],defaultValue:'editor',required:true,access:{update:({req})=>req.user?.role==='admin'}}],
}
const Media: CollectionConfig = {
  slug:'media',admin:{useAsTitle:'alt',description:'Only mark files public after approving them for the website.'},
  upload:{staticDir:path.resolve(dirname,'../media'),mimeTypes:['image/jpeg','image/png','image/webp','application/pdf']},
  access:{read:({req})=>req.user?true:{public:{equals:true}},create:staff,update:staff,delete:admin},
  fields:[{name:'alt',type:'text',localized:true,required:true},{name:'public',type:'checkbox',defaultValue:false,label:'Approved for public website'}],
}
const Pages: CollectionConfig = {
  slug:'pages',admin:{useAsTitle:'title',description:'Legacy page drafts retained. Use Website content for published site entries.'},
  access:{read:published,create:staff,update:staff,delete:admin},versions:{drafts:true},
  fields:[{name:'title',type:'text',localized:true,required:true},{name:'slug',type:'text',required:true,unique:true},{name:'content',type:'richText',localized:true}],
}
const Content: CollectionConfig = {
  slug:'content',labels:{singular:'Website content',plural:'Website content'},admin:{useAsTitle:'title',defaultColumns:['title','kind','slug','_status']},
  access:{read:published,create:staff,update:staff,delete:admin},versions:{drafts:true},
  fields:[
    {name:'kind',type:'select',required:true,options:['divisions','products','industries','cases','resources','certifications']},
    {name:'slug',type:'text',required:true,unique:true,validate:(value:string|null|undefined)=>Boolean(value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || 'Use lowercase words separated by hyphens.'},
    {name:'title',type:'text',localized:true,required:true},{name:'intro',type:'textarea',localized:true,required:true},
    {name:'tag',type:'text',localized:true},
    {name:'division',type:'select',options:['conveying','gas-systems','water-treatment']},
    {name:'image',type:'upload',relationTo:'media'},
    {name:'download',type:'upload',relationTo:'media',label:'Approved downloadable document'},
    {name:'sections',type:'array',localized:true,fields:[{name:'title',type:'text',required:true},{name:'text',type:'textarea',required:true}]},
    {name:'seo',type:'group',fields:[{name:'title',type:'text',localized:true},{name:'description',type:'textarea',localized:true}]},
  ],
}
const Inquiries: CollectionConfig = {
  slug:'inquiries',admin:{useAsTitle:'company',defaultColumns:['company','name','division','status','createdAt']},
  access:{read:staff,create:()=>false,update:staff,delete:admin},
  fields:[
    {name:'submissionId',type:'text',unique:true,required:true,admin:{readOnly:true}},
    ...['name','company','email','country','division'].map(name=>({name,type:'text' as const,required:true})),
    {name:'phone',type:'text'},{name:'message',type:'textarea',required:true},
    {name:'consent',type:'checkbox',required:true},
    {name:'status',type:'select',defaultValue:'new',options:['new','contacted','qualified','closed']},
    {name:'locale',type:'text'},{name:'source',type:'text'},
    {name:'utmSource',type:'text'},{name:'utmMedium',type:'text'},{name:'utmCampaign',type:'text'},
    {name:'clientHash',type:'text',admin:{hidden:true},access:{read:()=>false}},
  ],
}
export default buildConfig({
  admin:{user:'users',importMap:{baseDir:dirname}},
  secret:process.env.PAYLOAD_SECRET || '',serverURL:process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  localization:{locales:[{label:'简体中文',code:'zh'},{label:'English',code:'en'}],defaultLocale:'zh',fallback:false},
  db:postgresAdapter({pool:{connectionString:process.env.DATABASE_URL || ''},push:process.env.SITE_ENV!=='production'}),
  editor:lexicalEditor(),sharp,collections:[Users,Media,Pages,Content,Inquiries],
  globals:[{slug:'site-settings',label:'Website settings',access:{read:()=>true,update:admin},fields:[
    {name:'headline',type:'text',localized:true},{name:'intro',type:'textarea',localized:true},
    {name:'email',type:'email'},{name:'phone',type:'text'},{name:'address',type:'textarea',localized:true},
    {name:'certificateNote',type:'textarea',localized:true},
  ]}],
  typescript:{outputFile:path.resolve(dirname,'payload-types.ts')},
})
