import type { MetadataRoute } from 'next'
import { production,siteURL } from '@/lib/site'
export default function robots():MetadataRoute.Robots{return production?{rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/']},sitemap:siteURL()+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}}}

