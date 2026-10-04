'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatPrice, site } from '@/config/site';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Icon, Wave } from '@/components/Illustrations';

const NUMBERS = Array.from({ length: 29 }, (_, i) => i + 2); // o Encontro 1 é grátis

export default function AvulsoPage() {
  const [n, setN] = useState<number | null>(null);

  return (
    <>
      <header className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(70%_70%_at_50%_100%,rgba(235,168,35,.4),transparent)]">
        <div className="mx-auto max-w-2xl px-5 pb-12 pt-8 text-center">
          <Link href="/" aria-label="Voltar ao início" className="inline-block rounded-2xl bg-cream px-5 py-2"><Logo className="w-[170px]" /></Link>
          <p className="eyebrow mt-6 !text-gold-light">Encontros à parte</p>
          <h1 className="mt-1 text-3xl font-extrabold !text-white sm:text-5xl">Escolha o encontro que você quer</h1>
          <p className="mx-auto mt-3 max-w-md text-white/90">Cada encontro custa <b className="text-gold-light">{formatPrice(site.priceSingle)}</b>. O Encontro 1 é grátis.</p>
        </div>
        <Wave fill="#FFF5DB" />
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16">
        <p className="mb-3 text-center font-bold text-teal-dark" id="pick-label">Toque no número do encontro</p>
        <div role="radiogroup" aria-labelledby="pick-label" className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {NUMBERS.map((x) => (
            <button key={x} type="button" role="radio" aria-checked={n === x} onClick={() => setN(x)}
              className={`min-h-[52px] rounded-2xl border-2 font-serif text-lg font-black transition-all ${n === x ? 'scale-105 border-teal bg-gold text-teal-dark shadow-md' : 'border-gold/40 bg-white text-teal hover:border-gold'}`}>
              {x}
            </button>
          ))}
        </div>

        <div className="sticky bottom-3 mt-8 rounded-3xl border-2 border-gold bg-white p-5 text-center shadow-2xl" role="status" aria-live="polite">
          {n ? (
            <>
              <p className="font-serif text-xl font-bold text-teal-dark">Encontro {n}</p>
              <p className="font-serif text-4xl font-black text-teal">{formatPrice(site.priceSingle)}</p>
              <Link href={`/go?p=avulso&n=${n}`} className="btn-primary mt-3 w-full">Ir para o pagamento</Link>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-ink/70"><Icon name="shield" className="h-4 w-4" />Garantia incondicional de {site.guaranteeDays} dias</p>
            </>
          ) : (
            <p className="font-semibold text-ink/75">Escolha um número acima para continuar.</p>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-teal p-6 text-center text-white shadow-lg">
          <p className="eyebrow !text-gold-light">Prefere a coleção completa?</p>
          <p className="mt-1 text-xl font-bold">Os 30 encontros por {formatPrice()}</p>
          <p className="mt-1 text-sm text-white/85">Equivale a menos de {formatPrice(Math.ceil((site.price / 30) * 100) / 100)} por encontro.</p>
          <Link href="/go?p=principal" className="btn-primary mt-4 w-full max-w-xs">Quero os 30 encontros</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
