import Link from 'next/link';
import { formatPrice, site } from '@/config/site';

export default function Offer({ lead }: { lead?: string }) {
  return (
    <section id="oferta" className="bg-teal text-white" aria-labelledby="oferta-titulo">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center">
        <h2 id="oferta-titulo" className="mb-2 text-3xl font-bold !text-white">{site.productName}</h2>
        {lead && <p className="mb-4 text-white/90">{lead}</p>}
        <p className="font-serif text-5xl font-bold text-gold">{formatPrice()}</p>
        <p className="mt-1 text-sm text-white/85">pagamento único · 30 encontros</p>
        <p className="mx-auto mt-5 max-w-md text-white/95">
          Garantia incondicional de {site.guaranteeDays} dias: se não fizer sentido para a sua família, você pede o dinheiro de volta.
        </p>
        <Link href="/go?p=principal" className="btn-gold mt-7 w-full max-w-sm">Quero começar</Link>
      </div>
    </section>
  );
}
