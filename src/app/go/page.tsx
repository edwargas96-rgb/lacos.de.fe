'use client';
import { useEffect, useState } from 'react';
import { AFFILIATES } from '@/config/affiliates';
import { buildCheckoutUrl, captureAttribution, getAttribution, getVariant } from '@/lib/attribution';
import { getStorage } from '@/lib/storage';
import { track } from '@/lib/track';

export default function GoPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    let redirect: ReturnType<typeof setTimeout> | undefined;
    const manual = setTimeout(() => setShowManual(true), 3000);
    try {
      const store = getStorage();
      const params = new URLSearchParams(window.location.search);
      // Só existe o produto "principal" nesta etapa.
      if ((params.get('p') ?? 'principal') !== 'principal') throw new Error('produto desconhecido');
      // UTMs que chegam direto em /go também contam.
      const attr = params.has('a') || [...params.keys()].some((k) => k.startsWith('utm_'))
        ? captureAttribution(window.location.search, store)
        : getAttribution(store);
      const affiliate = AFFILIATES[attr.slug] ?? AFFILIATES.default;
      const variant = getVariant(affiliate, store);
      const target = buildCheckoutUrl(attr, affiliate, variant);
      setUrl(target);
      track('checkout_click', { produto: 'principal' });
      redirect = setTimeout(() => window.location.replace(target), 200);
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
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
      <h1 className="mb-3 text-2xl font-bold">Levando você ao pagamento seguro…</h1>
      <p className="mb-6" role="status">Só um instante.</p>
      {showManual && url && <a href={url} className="btn-primary">Continuar para o pagamento</a>}
      {showManual && !url && (
        <p>Não conseguimos abrir o pagamento agora. <a className="underline" href="/#oferta">Volte à oferta</a> e tente de novo.</p>
      )}
    </div>
  );
}
