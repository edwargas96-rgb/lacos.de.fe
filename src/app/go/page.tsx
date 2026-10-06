'use client';
import { useEffect, useState } from 'react';
import { AFFILIATES } from '@/config/affiliates';
import { buildCheckoutUrl, captureAttribution, getAttribution, getVariant, type Product } from '@/lib/attribution';
import { formatPrice, site } from '@/config/site';
import { parseEncounters } from '@/lib/encounters';
import { getStorage } from '@/lib/storage';
import { track } from '@/lib/track';
import Logo from '@/components/Logo';
import { Icon, Sun } from '@/components/Illustrations';

export default function GoPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    let redirect: ReturnType<typeof setTimeout> | undefined;
    const manual = setTimeout(() => setShowManual(true), 3000);
    try {
      const store = getStorage();
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p') ?? 'principal';
      if (p !== 'principal' && p !== 'avulso') throw new Error('produto desconhecido');
      const product: Product = p;
      if (product === 'avulso' && !site.avulsoEnabled) throw new Error('compra avulsa desativada');
      const encounter = product === 'avulso' ? parseEncounters(params.get('n'), site.avulsoMinimum) : undefined;
      if (product === 'avulso' && !encounter) throw new Error('encontros inválidos');

      // UTMs que chegam direto em /go também contam.
      const attr = params.has('a') || [...params.keys()].some((k) => k.startsWith('utm_'))
        ? captureAttribution(window.location.search, store)
        : getAttribution(store);
      const affiliate = AFFILIATES[attr.slug] ?? AFFILIATES.default;
      const variant = product === 'principal' ? getVariant(affiliate, store) : 'A';
      const target = buildCheckoutUrl(attr, affiliate, variant, undefined, undefined, product, encounter);
      setUrl(target);
      setLabel(product === 'principal' ? `Os 30 encontros · ${formatPrice()}` : `${encounter!.length} encontros (${encounter!.join(', ')}) · ${formatPrice(encounter!.length * site.priceSingle)}`);
      track('checkout_click', { produto: product, ...(encounter ? { encontros: encounter, quantidade: encounter.length } : {}) });
      redirect = setTimeout(() => window.location.replace(target), 300);
    } catch (err) {
      console.warn('[go] falha ao montar o checkout', err);
      setShowManual(true);
    }
    return () => {
      clearTimeout(manual);
      if (redirect) clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-teal-dark px-5 [background-image:radial-gradient(60%_50%_at_50%_100%,rgba(235,168,35,.45),transparent)]">
      <Sun className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-30" />
      <div className="relative w-full max-w-md rounded-3xl bg-cream p-8 text-center shadow-2xl">
        <Logo className="mx-auto w-[200px]" />
        {url || !showManual ? (
          <>
            <div className="mx-auto mt-6 h-12 w-12 animate-spin rounded-full border-4 border-sand border-t-gold" aria-hidden="true" />
            <h1 className="mt-5 text-2xl font-extrabold">Levando você ao pagamento seguro…</h1>
            {label && <p className="mt-2 font-bold text-gold-dark">{label}</p>}
            <p className="mt-1 text-sm text-ink/70" role="status">Só um instante.</p>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-2xl font-extrabold">Não conseguimos abrir o pagamento</h1>
            <p className="mt-2">Volte à oferta e tente de novo.</p>
            <a className="btn-primary mt-5 w-full" href="/#oferta">Voltar à oferta</a>
          </>
        )}
        {showManual && url && (
          <div className="mt-5">
            <p className="mb-2 text-sm text-ink/75">Se a página não abrir sozinha:</p>
            <a href={url} className="btn-primary w-full">Continuar para o pagamento</a>
          </div>
        )}
        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink/65"><Icon name="shield" className="h-4 w-4" />Garantia incondicional de {site.guaranteeDays} dias</p>
      </div>
    </div>
  );
}
