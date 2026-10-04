import Link from 'next/link';
import { site } from '@/config/site';
import Footer from './Footer';

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <article className="mx-auto max-w-2xl px-5 py-10 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
        <Link href="/" className="inline-flex min-h-[44px] items-center text-sm font-bold text-teal underline">← Início</Link>
        <h1 className="mb-4 mt-2 text-3xl font-bold">{title}</h1>
        {site.showLegalTodo && (
          <p className="mb-6 rounded-xl border-2 border-gold bg-gold/10 p-3 text-sm">
            <b>TODO:</b> texto-base, ainda sem revisão jurídica. Desligue este aviso em <code>showLegalTodo</code> (src/config/site.ts) depois de revisar.
          </p>
        )}
        {children}
      </article>
      <Footer />
    </>
  );
}
