import Link from 'next/link';
import { formatPrice, site } from '@/config/site';
import { Icon, Sun } from './Illustrations';

const money = (n: number) => formatPrice(Math.round(n * 100) / 100);

export default function Offer({ lead }: { lead?: string }) {
  const perFull = site.price / 30;
  const perEss = site.essencial.price / site.essencial.encounters;
  const hasPromo = site.promo.enabled && site.promo.fullPrice > site.price;
  const several = site.essencial.enabled || site.avulsoEnabled;
  const cols = site.essencial.enabled && site.avulsoEnabled ? 'lg:grid-cols-3' : several ? 'sm:grid-cols-2' : 'mx-auto max-w-md';

  return (
    <section id="oferta" className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(60%_80%_at_50%_0%,rgba(235,168,35,.35),transparent)]" aria-labelledby="oferta-titulo">
      <Sun className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 opacity-25" />
      <div className="relative mx-auto max-w-4xl px-5 py-16">
        <div className="text-center">
          <p className="eyebrow !text-gold-light">{several ? 'Escolha como começar' : 'Sua oferta'}</p>
          <h2 id="oferta-titulo" className="mb-2 mt-2 text-3xl font-bold !text-white sm:text-4xl">{site.productName}</h2>
          {lead && <p className="mb-2 text-white/90">{lead}</p>}
        </div>

        <div className={`mt-8 grid items-start gap-5 ${cols}`}>
          {/* Completa: a principal */}
          <div className="relative order-1 rounded-3xl border-4 border-gold bg-white p-6 text-center text-ink shadow-2xl">
            {several && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-teal-dark">Melhor valor</span>}
            <p className="mt-2 font-serif text-xl font-bold text-teal-dark">Os 30 encontros</p>
            {hasPromo ? (
              <div className="mt-2">
                <p className="text-lg text-ink/70">
                  <span className="sr-only">Preço original: </span>
                  De <s>{formatPrice(site.promo.fullPrice)}</s>
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-gold-dark">por apenas</p>
                <p className="font-serif text-6xl font-black text-teal">{formatPrice()}</p>
                <p className="mt-2 inline-block rounded-full bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-teal-dark">{site.promo.label}</p>
                <p className="mt-2 text-sm font-bold text-teal">Você economiza {money(site.promo.fullPrice - site.price)} nesta oferta</p>
              </div>
            ) : (
              <p className="mt-2 font-serif text-6xl font-black text-teal">{formatPrice()}</p>
            )}
            <p className="mt-1 text-sm text-ink/75">pagamento único · equivale a {money(perFull)} por encontro</p>
            <ul className="mt-4 space-y-2 text-left text-sm">
              {['30 encontros de 10 a 15 minutos', 'Versão curta e Versão + em cada um', 'Onboarding “Antes do primeiro encontro”', `Garantia de ${site.guaranteeDays} e de ${site.guarantee30Days} dias`].map((t) => (
                <li key={t} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />{t}</li>
              ))}
            </ul>
            <Link href="/go?p=principal" className="btn-primary mt-6 w-full">Quero os 30 encontros</Link>
          </div>

          {/* Essencial: a menor */}
          {site.essencial.enabled && (
            <div className="order-2 rounded-3xl border-2 border-white/30 bg-white/10 p-6 text-center backdrop-blur-sm">
              <p className="mt-2 font-serif text-xl font-bold !text-white">Essencial</p>
              <p className="mt-2 font-serif text-5xl font-black text-gold-light">{formatPrice(site.essencial.price)}</p>
              <p className="text-sm text-white/80">pagamento único · {money(perEss)} por encontro</p>
              <ul className="mt-4 space-y-2 text-left text-sm text-white/95">
                {[`Só os ${site.essencial.encounters} primeiros encontros (Dias 1 a ${site.essencial.encounters})`, 'Versão curta e Versão + em cada um', 'Onboarding “Antes do primeiro encontro”', `Garantia incondicional de ${site.guaranteeDays} dias`].map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />{t}</li>
                ))}
              </ul>
              <Link href="/go?p=essencial" className="btn-light mt-6 w-full">Quero o Essencial</Link>
            </div>
          )}

          {/* Encontros à parte (desligado por padrão) */}
          {site.avulsoEnabled && (
            <div className="order-3 rounded-3xl border-2 border-white/30 bg-white/10 p-6 text-center backdrop-blur-sm">
              <p className="mt-2 font-serif text-xl font-bold !text-white">Encontros à parte</p>
              <p className="mt-2 font-serif text-5xl font-black text-gold-light">{formatPrice(site.priceSingle)}</p>
              <p className="text-sm text-white/80">por encontro · você escolhe quais (mínimo de {site.avulsoMinimum})</p>
              <Link href="/avulso" className="btn-light mt-6 w-full">Escolher os encontros</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
