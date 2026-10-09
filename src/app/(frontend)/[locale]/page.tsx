import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const zh = locale === 'zh'
  return <main className="mx-auto max-w-6xl px-6 py-8 sm:px-12">
    <header className="flex items-center justify-between border-b border-border pb-6">
      <div className="flex items-center gap-4"><Image src="/brand/logo.svg" alt="KUANKI" width={52} height={50} /><strong className="text-2xl tracking-widest">KUANKI</strong></div>
      <Link href={zh ? '/en' : '/zh'} className="text-sm underline underline-offset-4">{zh ? 'English' : '简体中文'}</Link>
    </header>
    <section className="py-20 sm:py-28">
      <p className="mb-5 text-sm font-semibold tracking-widest text-primary">{zh ? '开发预览 · 内容建设中' : 'DEVELOPMENT PREVIEW · CONTENT IN PROGRESS'}</p>
      <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{zh ? '让工业输送更可靠，让流体运行更高效。' : 'Reliable conveying. Efficient fluid systems.'}</h1>
      <p className="mt-8 max-w-2xl text-lg leading-8">{zh ? '江苏匡集工业科技有限公司' : 'Jiangsu Kuanki Industry&Technology Co., Ltd'}</p>
      <div className="mt-10"><Button asChild><Link href="/admin">{zh ? '进入内容管理后台' : 'Open content management'}</Link></Button></div>
    </section>
    <section className="grid gap-5 md:grid-cols-3">
      {(zh ? ['传动输送事业部', '空分流体事业部', '循环水处理事业部'] : ['Conveying & Transmission', 'Central Gas Supply Systems', 'Circulating Water Treatment']).map((name, i) => <article key={name} className="border-t-2 border-primary bg-white p-7"><p className="mb-8 text-sm text-gray-500">0{i + 1}</p><h2 className="text-xl font-semibold">{name}</h2><p className="mt-4 text-sm text-gray-500">{zh ? '产品、案例与技术资料待补充' : 'Products, projects and technical resources to follow'}</p></article>)}
    </section>
    <footer className="mt-16 border-t border-border py-6 text-sm text-gray-500">{zh ? '此页面用于验证云端开发环境，不是正式官网。' : 'This page validates the development environment. It is not the production website.'}</footer>
  </main>
}

