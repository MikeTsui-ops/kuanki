import '../../../(frontend)/globals.css'
export default async function PreviewLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params
  return <html lang={locale==='en'?'en':'zh-CN'}><body>{children}</body></html>
}
