'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice, site } from '@/config/site';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Icon, Wave } from '@/components/Illustrations';
import { track } from '@/lib/track';

const COUNTDOWN = 8; // segundos para ler antes de seguir

const NUMBERS = Array.from({ length: 29 }, (_, i) => i + 2); // o Encontro 1 é grátis
const MIN = site.avulsoMinimum;

export default function AvulsoPage() {
  const router = useRouter();
  const [picked, setPicked] = useState<number[]>([]);
  const [asking, setAsking] = useState(false);
  const [left, setLeft] = useState(COUNTDOWN);
  const [paused, setPaused] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!site.avulsoEnabled) router.replace('/#oferta');
  }, [router]);

  const toggle = (x: number) =>
    setPicked((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x].sort((a, b) => a - b)));

  const count = picked.length;
  const total = Math.round(count * site.priceSingle * 100) / 100;
  const ok = count >= MIN;
  const missing = MIN - count;
  const cheaperPackage = ok && total > site.price;
  const avulsoHref = `/go?p=avulso&n=${picked.join(',')}`;

  function openUpsell() {
    if (!cheaperPackage) {
      router.push(avulsoHref);
      return;
    }
    setLeft(COUNTDOWN);
    setPaused(false);
    setAsking(true);
    track('avulso_upsell', { quantidade: count, total, etapa: 'exibido' });
  }

  useEffect(() => {
    if (!asking) return;
    headingRef.current?.focus();
  }, [asking]);

  useEffect(() => {
    if (!asking || paused) return;
    if (left <= 0) {
      track('avulso_upsell', { quantidade: count, total, etapa: 'redirecionado_automatico' });
      router.push('/go?p=principal');
      return;
    }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [asking, paused, left]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!site.avulsoEnabled) return null;

  return (
    <>
      <header className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(70%_70%_at_50%_100%,rgba(235,168,35,.4),transparent)]">
        <div className="mx-auto max-w-2xl px-5 pb-12 pt-8 text-center">
          <Link href="/" aria-label="Voltar ao início" className="inline-block rounded-2xl bg-cream px-5 py-2"><Logo className="w-[170px]" /></Link>
          <p className="eyebrow mt-6 !text-gold-light">Encontros à parte</p>
          <h1 className="mt-1 text-3xl font-extrabold !text-white sm:text-5xl">Monte o seu pacote de encontros</h1>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Cada encontro custa <b className="text-gold-light">{formatPrice(site.priceSingle)}</b>. Escolha no mínimo <b className="text-gold-light">{MIN}</b>. O Encontro 1 é grátis.
          </p>
        </div>
        <Wave fill="#FFF5DB" />
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16">
        <p className="mb-1 text-center font-bold text-teal-dark" id="pick-label">Toque nos encontros que você quer</p>
        <p className="mb-4 text-center text-sm text-ink/70">Você pode marcar vários.</p>
        <div role="group" aria-labelledby="pick-label" className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {NUMBERS.map((x) => {
            const on = picked.includes(x);
            return (
              <button key={x} type="button" aria-pressed={on} onClick={() => toggle(x)}
                className={`min-h-[52px] rounded-2xl border-2 font-serif text-lg font-black transition-all ${on ? 'scale-105 border-teal bg-gold text-teal-dark shadow-md' : 'border-gold/40 bg-white text-teal hover:border-gold'}`}>
                <span className="sr-only">Encontro </span>{x}{on && <span aria-hidden="true" className="ml-0.5 text-sm">✓</span>}
              </button>
            );
          })}
        </div>

        <div className="sticky bottom-3 mt-8 rounded-3xl border-2 border-gold bg-white p-5 text-center shadow-2xl" role="status" aria-live="polite">
          {count === 0 && <p className="font-semibold text-ink/75">Escolha pelo menos {MIN} encontros para continuar.</p>}
          {count > 0 && (
            <>
              <p className="font-serif text-lg font-bold text-teal-dark">
                {count} {count === 1 ? 'encontro' : 'encontros'}: {picked.join(', ')}
              </p>
              <p className="font-serif text-4xl font-black text-teal">{formatPrice(total)}</p>
              {!ok ? (
                <p className="mt-2 font-semibold text-gold-dark">
                  Falta{missing > 1 ? 'm' : ''} {missing} {missing > 1 ? 'encontros' : 'encontro'} para o mínimo de {MIN}.
                </p>
              ) : (
                <>
                  <button type="button" onClick={openUpsell} className="btn-primary mt-3 w-full">Ir para o pagamento</button>
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs text-ink/70"><Icon name="shield" className="h-4 w-4" />Garantia incondicional de {site.guaranteeDays} dias</p>
                </>
              )}
            </>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-teal p-6 text-center text-white shadow-lg">
          <p className="eyebrow !text-gold-light">{cheaperPackage ? 'Repare na diferença' : 'Prefere a coleção completa?'}</p>
          <p className="mt-1 text-xl font-bold">
            {cheaperPackage
              ? `${count} encontros à parte custam ${formatPrice(total)}. Os 30 encontros custam ${formatPrice()}.`
              : `Os 30 encontros por ${formatPrice()}`}
          </p>
          <p className="mt-1 text-sm text-white/85">Equivale a menos de {formatPrice(Math.ceil((site.price / 30) * 100) / 100)} por encontro.</p>
          <Link href="/go?p=principal" className="btn-primary mt-4 w-full max-w-xs">Quero os 30 encontros</Link>
        </div>
      </main>
      <Footer />

      {asking && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-teal-dark/80 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="upsell-title">
          <div className="w-full max-w-md rounded-3xl border-4 border-gold bg-cream p-6 text-center shadow-2xl">
            <Icon name="heart" className="mx-auto h-10 w-10 text-gold-dark" />
            <h2 id="upsell-title" ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-extrabold outline-none">Antes de pagar, repare nisso</h2>
            <p className="mt-3 text-lg">
              Você está pagando <b className="text-teal">{formatPrice(total)}</b> por <b>{count} encontros</b>. Os <b>30 encontros</b> custam <b className="text-teal">{formatPrice()}</b>: <b>mais conteúdo por um valor menor</b>.
            </p>
            <p className="mt-2 text-sm text-ink/75">Vamos te levar ao checkout dos 30 encontros{paused ? '.' : ` em ${left}s`}.</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand" aria-hidden="true">
              <div className="h-full rounded-full bg-gold transition-all duration-1000 ease-linear" style={{ width: `${paused ? 100 : ((COUNTDOWN - left) / COUNTDOWN) * 100}%` }} />
            </div>
            <Link href="/go?p=principal" onClick={() => track('avulso_upsell', { quantidade: count, total, etapa: 'aceitou' })} className="btn-primary mt-5 w-full">
              Quero os 30 encontros por {formatPrice()}
            </Link>
            <Link href={avulsoHref} onClick={() => track('avulso_upsell', { quantidade: count, total, etapa: 'manteve_avulso' })} className="btn-secondary mt-3 w-full">
              Prefiro só os {count} por {formatPrice(total)}
            </Link>
            <button type="button" onClick={() => { setPaused(true); setAsking(false); }} className="mt-3 min-h-[44px] text-sm font-semibold text-ink/70 underline">
              Voltar e mudar a seleção
            </button>
          </div>
        </div>
      )}
    </>
  );
}
