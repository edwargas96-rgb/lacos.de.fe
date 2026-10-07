import Link from 'next/link';
import { formatPrice, site } from '@/config/site';
import { Icon } from './Illustrations';
import type { UnlockVia } from '@/lib/unlock';

/** Mensagem de parabéns + cupom, no fim do quiz e do Encontro 1. */
export default function UnlockMessage({ via }: { via: UnlockVia }) {
  if (!site.checkoutCoupon.enabled || !site.promo.enabled) return null;
  const opening = via === 'quiz'
    ? 'Você dedicou um tempo para pensar na fé da sua família.'
    : 'Vocês pararam para viver um encontro juntos.';
  return (
    <section className="rounded-3xl border-4 border-gold bg-teal-dark p-6 text-center text-white shadow-2xl" aria-labelledby="parabens">
      <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-teal-dark" aria-hidden="true">
        <Icon name="heart" className="h-8 w-8" />
      </span>
      <p className="eyebrow !text-gold-light">Presente para a sua família</p>
      <h2 id="parabens" className="mt-1 text-2xl font-extrabold !text-white sm:text-3xl">Parabéns por cuidar do seu lar!</h2>
      <p className="mx-auto mt-3 max-w-md text-lg text-white/95">
        {opening} Isso diz muito sobre o cuidado que você tem com a sua casa. Por isso, você merece um presente: o cupom{' '}
        <b className="rounded-md bg-white/15 px-2 py-0.5 text-gold-light">{site.checkoutCoupon.code}</b>, que leva os 30 encontros de{' '}
        <s>{formatPrice(site.promo.fullPrice)}</s> para <b className="text-gold-light">{formatPrice()}</b>.
      </p>
      <Link href="/go?p=principal" className="btn-primary mt-5 w-full max-w-sm">Usar meu desconto</Link>
      <p className="mt-3 text-sm text-white/80">O cupom é aplicado automaticamente no pagamento.</p>
    </section>
  );
}
