import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import TrackView from '@/components/TrackView';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Icon, Wave } from '@/components/Illustrations';

export const metadata: Metadata = {
  title: `Compra confirmada — ${site.brand}`,
  robots: { index: false, follow: false },
};

const steps = [
  ['Confira o seu e-mail', 'Em instantes você recebe a mensagem com o acesso. Se não aparecer, olhe também o spam e a aba Promoções.'],
  ['Entre na área dos encontros', 'Use o botão acima ou o link do e-mail. Entre com o e-mail da compra; no primeiro acesso, crie a sua senha pelo convite.'],
  ['Comece pelo Dia 1', 'São 10 a 15 minutos: história, conversa, atividade fora da tela e oração. Sem preparo.'],
];

export default function Obrigado() {
  const { whatsapp, membersUrl } = site.support;
  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Acabei de comprar o Laços de Fé e preciso de ajuda com o meu acesso.')}`
    : '';

  return (
    <>
      <TrackView event="view_obrigado" />
      <header className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(70%_70%_at_50%_100%,rgba(235,168,35,.45),transparent)]">
        <div className="mx-auto max-w-2xl px-5 pb-12 pt-8 text-center">
          <Link href="/" aria-label="Ir para o início" className="inline-block rounded-2xl bg-cream px-5 py-2"><Logo className="w-[170px]" /></Link>
          <span className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-teal-dark shadow-lg" aria-hidden="true">
            <Icon name="check" className="h-9 w-9" />
          </span>
          <p className="eyebrow mt-4 !text-gold-light">Compra confirmada</p>
          <h1 className="mt-1 text-3xl font-black !text-white sm:text-5xl">Obrigado por abrir a sua casa para a fé</h1>
          <p className="mx-auto mt-3 max-w-md text-white/90">Falta pouco para o seu primeiro encontro em família.</p>
        </div>
        <Wave fill="#FFF5DB" />
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16">
        {membersUrl && (
          <section className="-mt-2 mb-10 rounded-3xl border-4 border-gold bg-teal-dark p-6 text-center text-white shadow-2xl" aria-labelledby="area">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-teal-dark" aria-hidden="true">
              <Icon name="book" className="h-8 w-8" />
            </span>
            <p className="eyebrow !text-gold-light">Seu acesso está pronto</p>
            <h2 id="area" className="mt-1 text-2xl font-extrabold !text-white sm:text-3xl">Entre na sua área de membros</h2>
            <p className="mx-auto mt-3 max-w-md text-white/90">
              É lá que ficam os 30 encontros. Entre com o <b>e-mail que você usou na compra</b>. Se for o seu primeiro acesso, use o convite que chegou por e-mail para criar a sua senha.
            </p>
            <a href={membersUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full max-w-sm">Acessar a área de membros</a>
            <p className="mt-3 text-sm text-white/75">Dica: salve este endereço nos favoritos do celular.</p>
          </section>
        )}

        <h2 className="mb-5 text-center text-2xl font-extrabold">Seus próximos passos</h2>
        <ol className="space-y-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="card flex gap-4 !border-l-8 !border-l-gold">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal font-serif text-xl font-black text-gold-light" aria-hidden="true">{i + 1}</span>
              <span><b className="font-serif text-xl text-teal-dark">{t}</b><br />{d}</span>
            </li>
          ))}
        </ol>


        <section className="mt-10 rounded-3xl bg-teal p-6 text-center text-white shadow-lg" aria-labelledby="ajuda">
          <h2 id="ajuda" className="text-xl font-extrabold !text-white">Não recebeu o acesso?</h2>
          <p className="mt-2 text-white/90">Confira o e-mail usado na compra e a caixa de spam. Se ainda assim não chegou, fale com a gente.</p>
          {waLink ? (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full max-w-sm">Falar com o suporte no WhatsApp</a>
          ) : null}
        </section>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink/75">
          <Icon name="shield" className="h-5 w-5 shrink-0" />
          Você tem {site.guaranteeDays} dias de garantia incondicional e {site.guarantee30Days} dias de Garantia Laços de Fé.
        </p>
      </main>
      <Footer />
    </>
  );
}
