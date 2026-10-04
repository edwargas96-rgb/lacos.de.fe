import Link from 'next/link';
import { site } from '@/config/site';
import TrackView from '@/components/TrackView';
import ProductImageSlot from '@/components/ProductImageSlot';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';
import Footer from '@/components/Footer';
import { Hills, Sun } from '@/components/Illustrations';

const faq = [
  { q: 'Precisa ter Bíblia?', a: 'Não. A história de cada encontro já vem recontada no celular, com palavras simples.' },
  { q: 'Serve para mais de um filho?', a: 'Sim. Cada encontro tem Versão curta e Versão +, então vocês escolhem a que cabe em cada conversa, mesmo com idades diferentes na mesma casa.' },
  { q: 'Posso pular um dia?', a: 'Sim, nada se perde. Os encontros anteriores ficam sempre acessíveis e você retoma quando puder.' },
  { q: 'Como recebo o acesso?', a: 'Por WhatsApp, em até 1 hora após a compra.' },
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

      {/* HERO: 1) hook  2) Laços de Fé  3) espaço da foto */}
      <header className="relative overflow-hidden bg-cream [background-image:radial-gradient(60%_40%_at_50%_30%,rgba(224,169,59,.22),transparent)]">
        <Sun className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-70 sm:h-40 sm:w-40" />
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-10 text-center sm:pt-14">
          <h1 className="font-serif text-[2rem] font-black leading-[1.1] sm:text-5xl">
            {site.hook.line1}{' '}
            <span className="mt-1 block text-gold-dark">{site.hook.line2}</span>
          </h1>

          <p className="mt-6 font-serif text-3xl font-bold tracking-wide text-teal">{site.brand}</p>
          <div className="gold-rule mt-3" aria-hidden="true" />

          <div className="mx-auto mt-6 max-w-xl">
            <ProductImageSlot />
          </div>

          <h2 className="mx-auto mt-8 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
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
        <Hills className="block h-14 w-full" />
      </header>

      <section className="bg-teal-dark text-white" aria-labelledby="identificacao">
        <div className="mx-auto max-w-3xl px-5 py-12 text-center">
          <h2 id="identificacao" className="font-serif text-2xl font-bold leading-snug !text-white sm:text-3xl">
            Você quer que a fé faça parte da sua casa, mas não sabe como começar, o tempo aperta e o celular parece sempre mais interessante.
          </h2>
        </div>
      </section>

      <section className="section" aria-labelledby="o-que-e">
        <h2 id="o-que-e" className="mb-4 text-2xl font-bold sm:text-3xl">O que é</h2>
        <p className="text-lg">
          Um roteiro guiado para <b>você</b> conduzir. O celular é o seu guia, não o brinquedo do seu filho.
        </p>
      </section>

      <section className="bg-sand/60" aria-labelledby="como-e">
        <div className="section">
          <p className="eyebrow text-center">10 a 15 minutos</p>
          <h2 id="como-e" className="mb-6 mt-1 text-center text-2xl font-bold sm:text-3xl">Como é um encontro</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {blocks.map(([t, d], i) => (
              <li key={t} className="card flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal font-bold text-gold-light" aria-hidden="true">{i + 1}</span>
                <span><b className="font-serif text-lg text-teal-dark">{t}</b><br />{d}</span>
              </li>
            ))}
          </ol>
          <p className="card mt-4 !border-gold !bg-cream">
            <b>Plano B.</b> Quando ele não quer participar, cada encontro traz uma alternativa pronta para você usar.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="recebe">
        <h2 id="recebe" className="mb-5 text-2xl font-bold sm:text-3xl">O que você recebe</h2>
        <ul className="space-y-3">
          <li className="card"><b>30 encontros, um por dia.</b> Um novo encontro é liberado a cada dia para criar o hábito sem sobrecarga. Os anteriores ficam sempre acessíveis, e você pode retomar quando quiser.</li>
          <li className="card"><b>“Antes do primeiro encontro”.</b> Um onboarding rápido para os pais.</li>
          <li className="card"><b>Versão curta e Versão +</b> em cada encontro, para idades diferentes na mesma casa.</li>
          <li className="card"><b>Progresso salvo</b>, para vocês continuarem de onde pararam.</li>
        </ul>
      </section>

      <section className="bg-sand/60" aria-labelledby="para-quem">
        <div className="section grid gap-6 sm:grid-cols-2">
          <div>
            <h2 id="para-quem" className="mb-3 text-2xl font-bold">É para você se…</h2>
            <p>Você quer um jeito simples e constante de conversar sobre a fé em família.</p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold">Não é para você se…</h3>
            <p>Você espera transformação garantida ou prefere estudo teológico profundo.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="se-nao-quiser">
        <h2 id="se-nao-quiser" className="mb-5 text-2xl font-bold sm:text-3xl">Se ele não quiser</h2>
        <ul className="space-y-3">
          <li className="card">Comece pela atividade e deixe a história para depois.</li>
          <li className="card">Conte você mesmo a história em 1 minuto, com suas palavras.</li>
          <li className="card">Se ele disser “hoje não”, agradeça e convide de novo amanhã, sem bronca.</li>
        </ul>
      </section>

      <section className="bg-teal-soft" aria-labelledby="garantia">
        <div className="section text-center">
          <h2 id="garantia" className="mb-3 text-2xl font-bold sm:text-3xl">Garantia incondicional de {site.guaranteeDays} dias</h2>
          <p>Experimente com a sua família. Se não fizer sentido para vocês, é só pedir o reembolso dentro de {site.guaranteeDays} dias.</p>
        </div>
      </section>

      <Testimonials />

      <section className="section" aria-labelledby="faq">
        <h2 id="faq" className="mb-5 text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="card group">
              <summary className="flex min-h-[44px] cursor-pointer items-center font-bold">{f.q}</summary>
              <p className="pt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Offer />
      <Footer />
    </>
  );
}
