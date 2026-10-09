import Link from 'next/link';
import { site } from '@/config/site';
import TrackView from '@/components/TrackView';
import ProductImageSlot from '@/components/ProductImageSlot';
import Logo from '@/components/Logo';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';
import Footer from '@/components/Footer';
import CtaPair from '@/components/CtaPair';
import StickyCta from '@/components/StickyCta';
import { Icon, Rays, Sun, Wave } from '@/components/Illustrations';

const faq = [
  { q: 'Precisa ter Bíblia?', a: 'Não. A história de cada encontro já vem recontada no celular, com palavras simples.' },
  { q: 'Serve para mais de um filho?', a: 'Sim. Cada encontro tem Versão curta e Versão +, então vocês escolhem a que cabe em cada conversa, mesmo com idades diferentes na mesma casa.' },
  { q: 'Posso pular um dia?', a: 'Sim, nada se perde. Os encontros anteriores ficam sempre acessíveis e você retoma quando puder.' },
  { q: 'Como funciona a garantia de 30 dias?', a: 'Faça os encontros durante 30 dias. Se, mesmo assim, a sua família não mudou em nada, envie o registro dos encontros que vocês fizeram e devolvemos 100% do valor.' },
  ...(site.essencial.enabled ? [{ q: 'Qual a diferença entre o Essencial e os 30 encontros?', a: `O Essencial traz os ${site.essencial.encounters} primeiros encontros. Os 30 encontros trazem todos, com a Garantia Laços de Fé de ${site.guarantee30Days} dias. Os dois têm Versão curta, Versão + e Plano B.` }] : []),
  { q: 'Como recebo o acesso?', a: 'Por e-mail, assim que o pagamento for confirmado: você recebe o link e o login da área dos encontros. Se não chegar, olhe o spam ou chame o nosso suporte.' },
  { q: 'Funciona para qualquer denominação cristã?', a: 'O conteúdo é cristão e evita temas que dividem denominações.' },
];

const blocks = [
  ['História', 'Uma narrativa bíblica curta, recontada com palavras simples.'],
  ['Conversa', 'Três perguntas para abrir o diálogo, sem resposta certa ou errada.'],
  ['Atividade fora da tela', 'Um gesto prático de uns 5 minutos, com materiais que você já tem em casa.'],
  ['Oração', 'Uma oração curta para fechar o encontro juntos.'],
];

export default function Home() {
  return (
    <>
      <TrackView event="view_landing" />

      {/* 1) HOOK agressivo */}
      <header className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(70%_60%_at_50%_100%,rgba(235,168,35,.45),transparent)]">
        <Rays className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-12 text-center sm:pt-16">
          <h1 className="font-serif text-[2.15rem] font-black leading-[1.08] !text-white sm:text-6xl">
            {site.hook.line1}
            <span className="mt-2 block text-gold-light">{site.hook.line2}</span>
          </h1>
          <div className="mt-7">
            <CtaPair dark />
            {site.checkoutCoupon.enabled && site.checkoutCoupon.requiresUnlock && (
              <p className="mt-3 text-sm font-semibold text-gold-light">Faça o quiz ou o Encontro 1 e libere um preço especial.</p>
            )}
          </div>
        </div>
        <Wave fill="#FFF5DB" />
      </header>

      {/* 2) LOGO  3) IMAGEM DO PRODUTO */}
      <section className="relative overflow-hidden bg-cream [background-image:radial-gradient(60%_40%_at_50%_45%,rgba(255,214,107,.55),transparent)]">
        <div className="mx-auto max-w-3xl px-5 pb-10 text-center">
          <Logo className="mx-auto w-[280px] sm:w-[360px]" />
          <div className="mx-auto mt-4 max-w-xl">
            <ProductImageSlot />
          </div>
          <h2 className="mx-auto mt-8 max-w-2xl text-2xl font-extrabold leading-snug sm:text-4xl">
            30 encontros de 15 minutos para abrir a Bíblia em família, mesmo se você não sabe por onde começar.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/85">
            Uma história curta, três perguntas, uma atividade longe da tela e uma oração. Tudo pronto no seu celular, sem preparo.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/quiz" className="btn-primary">Fazer o quiz de 1 minuto</Link>
            <Link href="/encontro-1" className="btn-secondary">Ver o Encontro 1 grátis</Link>
          </div>
        </div>
        <Wave fill="#FFD66B" />
      </section>

      <section className="bg-gold-light" aria-labelledby="identificacao">
        <div className="mx-auto max-w-3xl px-5 pb-14 pt-4 text-center">
          <Icon name="heart" className="mx-auto mb-3 h-10 w-10 text-teal" />
          <h2 id="identificacao" className="font-serif text-2xl font-extrabold leading-snug sm:text-4xl">
            Você quer que a fé faça parte da sua casa, mas não sabe como começar, o tempo aperta e o celular parece sempre mais interessante.
          </h2>
        </div>
        <Wave fill="#FFF5DB" />
      </section>

      <Testimonials />

      <section className="bg-sand" aria-labelledby="criadora">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-5 py-14 sm:grid-cols-5 sm:py-20">
          <div className="sm:col-span-2">
            <div className="relative mx-auto max-w-[300px]">
              <div aria-hidden="true" className="absolute -inset-2 rotate-3 rounded-[2rem] bg-gold" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.founder.photo.src}
                alt={site.founder.photo.alt}
                width={site.founder.photo.width}
                height={site.founder.photo.height}
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-[2rem] border-4 border-white object-cover object-top shadow-xl"
              />
            </div>
            <p className="mt-5 text-center font-serif text-lg font-bold text-teal-dark">{site.founder.name}</p>
            <p className="text-center text-sm text-ink/75">Esposa, mãe e criadora do {site.brand}</p>
          </div>
          <div className="space-y-4 text-lg sm:col-span-3">
            <p className="eyebrow">Quem criou o método</p>
            <h2 id="criadora" className="!mt-1 text-2xl font-extrabold sm:text-4xl">Conheça a criadora do {site.brand}</h2>
            <p>
              <b>{site.founder.name}</b> é esposa, mãe e criadora do <b>{site.brand}</b>. Após um período afastada da igreja, viveu dificuldades no casamento, com discussões frequentes e o celular ocupando espaço na convivência familiar.
            </p>
            <p>
              Ao se reaproximar de Deus, Maria conta que sentiu uma missão: ajudar outras famílias a encontrar tempo para estar juntas e compartilhar a fé. Dessa motivação nasceu o {site.brand}.
            </p>
            <p>
              O método oferece <b>30 encontros de 10 a 15 minutos</b>, com histórias bíblicas ilustradas, perguntas para conversar, atividades fora da tela e orações simples. Também inclui orientações para os pais e um Plano B quando o filho não quiser participar.
            </p>
            <p>
              Seu propósito é facilitar a leitura da Bíblia em família e criar oportunidades de diálogo, presença e conexão, respeitando o ritmo de cada lar.
            </p>
          </div>
        </div>
      </section>

      <section className="section text-center" aria-labelledby="o-que-e">
        <p className="eyebrow">O que é</p>
        <h2 id="o-que-e" className="mt-2 text-2xl font-extrabold sm:text-4xl">Um roteiro guiado para <span className="text-gold-dark">você</span> conduzir</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg">O celular é o seu guia, não o brinquedo do seu filho.</p>
      </section>

      <section className="relative overflow-hidden bg-teal text-white" aria-labelledby="como-e">
        <Sun className="pointer-events-none absolute -right-10 top-4 h-40 w-40 opacity-30" />
        <div className="section relative">
          <p className="eyebrow text-center !text-gold-light">10 a 15 minutos</p>
          <h2 id="como-e" className="mb-8 mt-1 text-center text-2xl font-extrabold !text-white sm:text-4xl">Como é um encontro</h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {blocks.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-3xl bg-white p-5 text-ink shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold font-serif text-xl font-black text-teal-dark" aria-hidden="true">{i + 1}</span>
                <span><b className="font-serif text-xl text-teal-dark">{t}</b><br />{d}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-3xl border-2 border-gold bg-teal-dark p-5 text-white">
            <b className="text-gold-light">Plano B.</b> Quando ele não quer participar, cada encontro traz uma alternativa pronta para você usar.
          </p>
        </div>
        <Wave fill="#FFF5DB" />
      </section>

      <section className="section" aria-labelledby="recebe">
        <p className="eyebrow text-center">Tudo incluso</p>
        <h2 id="recebe" className="mb-8 mt-1 text-center text-2xl font-extrabold sm:text-4xl">O que você recebe</h2>
        <ul className="space-y-4">
          {[
            ['calendar', '30 encontros, um por dia.', 'Um novo encontro é liberado a cada dia para criar o hábito sem sobrecarga. Os anteriores ficam sempre acessíveis, e você pode retomar quando quiser.'],
            ['book', '“Antes do primeiro encontro”.', 'Um onboarding rápido para os pais.'],
            ['layers', 'Versão curta e Versão +', 'em cada encontro, para idades diferentes na mesma casa.'],
            ['check', 'Progresso salvo,', 'para vocês continuarem de onde pararam.'],
          ].map(([icon, t, d]) => (
            <li key={t} className="card flex gap-4 !border-l-8 !border-l-gold">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal text-gold-light">
                <Icon name={icon as 'calendar'} />
              </span>
              <span><b className="font-serif text-lg text-teal-dark">{t}</b> {d}</span>
            </li>
          ))}
        </ul>
        <CtaPair className="mt-8" />
      </section>

      <section className="bg-sand" aria-labelledby="para-quem">
        <div className="section grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-teal-dark"><Icon name="check" /></span>
            <h2 id="para-quem" className="mb-2 text-2xl font-extrabold">É para você se…</h2>
            <p>Você quer um jeito simples e constante de conversar sobre a fé em família.</p>
          </div>
          <div className="rounded-3xl bg-teal p-6 text-white shadow-lg">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl font-black text-gold-light" aria-hidden="true">×</span>
            <h3 className="mb-2 text-2xl font-extrabold !text-white">Não é para você se…</h3>
            <p>Você espera transformação garantida ou prefere estudo teológico profundo.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="se-nao-quiser">
        <p className="eyebrow text-center">Plano B</p>
        <h2 id="se-nao-quiser" className="mb-6 mt-1 text-center text-2xl font-extrabold sm:text-4xl">Se ele não quiser</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {['Comece pela atividade e deixe a história para depois.', 'Conte você mesmo a história em 1 minuto, com suas palavras.', 'Se ele disser “hoje não”, agradeça e convide de novo amanhã, sem bronca.'].map((t, i) => (
            <li key={t} className={`rounded-3xl p-5 font-semibold shadow-md ${i === 1 ? 'bg-gold text-teal-dark' : 'bg-white'}`}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(60%_70%_at_50%_100%,rgba(235,168,35,.3),transparent)]" aria-labelledby="garantia">
        <div className="section">
          <div className="text-center">
            <Icon name="shield" className="mx-auto mb-3 h-14 w-14 text-gold" />
            <p className="eyebrow !text-gold-light">Risco zero para a sua família</p>
            <h2 id="garantia" className="mb-8 mt-1 text-2xl font-extrabold !text-white sm:text-4xl">Duas garantias, o risco é nosso</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 text-ink shadow-xl">
              <p className="font-serif text-4xl font-black text-teal">{site.guaranteeDays} dias</p>
              <h3 className="mt-1 text-xl font-extrabold">Garantia incondicional</h3>
              <p className="mt-2">Se não fizer sentido para vocês, é só pedir o reembolso dentro de {site.guaranteeDays} dias, sem precisar explicar.</p>
            </div>
            <div className="rounded-3xl border-4 border-gold bg-teal p-6 shadow-xl">
              <p className="font-serif text-4xl font-black text-gold-light">{site.guarantee30Days} dias</p>
              <h3 className="mt-1 text-xl font-extrabold !text-white">Garantia Laços de Fé</h3>
              <p className="mt-2 text-white/95">Faça os encontros por {site.guarantee30Days} dias. Se você comprovar que fez e a sua família não mudou em nada, devolvemos <b>100% do seu dinheiro</b>.</p>
              {/* TODO: definir e informar o processo de comprovação (ex.: registro dos encontros feitos enviado por WhatsApp). */}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq">
        <h2 id="faq" className="mb-6 text-center text-2xl font-extrabold sm:text-4xl">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="card group open:!border-gold open:bg-white">
              <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 font-bold">
                {f.q}
                <span aria-hidden="true" className="text-2xl text-gold-dark group-open:rotate-45">+</span>
              </summary>
              <p className="pt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Offer />
      <Footer />
      <StickyCta />
    </>
  );
}
