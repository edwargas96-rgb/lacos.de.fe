import Link from 'next/link';
import { formatPrice, site } from '@/config/site';
import { Sun } from './Illustrations';

export default function Offer({ lead }: { lead?: string }) {
  return (
    <section id="oferta" className="relative overflow-hidden bg-teal-dark text-white" aria-labelledby="oferta-titulo">
      <Sun className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 opacity-25" />
      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="eyebrow !text-gold-light">Sua oferta</p>
        <h2 id="oferta-titulo" className="mb-2 mt-2 text-3xl font-bold !text-white sm:text-4xl">{site.productName}</h2>
        {lead && <p className="mb-4 text-white/90">{lead}</p>}
        <p className="font-serif text-6xl font-black text-gold">{formatPrice()}</p>
        <p className="mt-1 text-sm text-white/85">pagamento único · 30 encontros</p>
        <p className="mx-auto mt-5 max-w-md text-white/95">
          Garantia incondicional de {site.guaranteeDays} dias: se não fizer sentido para a sua família, você pede o dinheiro de volta.
        </p>
        <Link href="/go?p=principal" className="btn-primary mt-8 w-full max-w-sm">Quero começar</Link>
      </div>
    </section>
  );
}
