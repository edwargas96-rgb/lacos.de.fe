'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { encontro1 as e } from '@/content/encontro-1';
import { ANSWERS_KEY, defaultVersion, type Answers, type EncounterVersion } from '@/lib/quiz';
import { getStorage, readJSON, writeJSON } from '@/lib/storage';
import { track } from '@/lib/track';
import TrackView from '@/components/TrackView';
import Footer from '@/components/Footer';
import Skeleton from '@/components/Skeleton';
import { Wave } from '@/components/Illustrations';
import Logo from '@/components/Logo';

const DONE_KEY = 'lf_e1_done';
interface Done { rating: number }

export default function Encontro1Page() {
  const [version, setVersion] = useState<EncounterVersion>('curta');
  const [both, setBoth] = useState(false);
  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const store = getStorage();
    const answers = readJSON<Answers>(store, ANSWERS_KEY);
    setVersion(defaultVersion(answers));
    setBoth(answers?.filhos === 'ambas');
    const d = readJSON<Done>(store, DONE_KEY);
    if (d) {
      setDone(true);
      setRating(d.rating);
    }
    setReady(true);
  }, []);

  function finish() {
    if (!rating) return;
    writeJSON(getStorage(), DONE_KEY, { rating } satisfies Done);
    track('encontro1_done', { nota: rating });
    setDone(true);
  }

  return (
    <>
      <TrackView event="view_encontro1" />
      <header className="relative overflow-hidden bg-teal-dark text-white [background-image:radial-gradient(70%_70%_at_50%_100%,rgba(235,168,35,.4),transparent)]">
        <div className="mx-auto max-w-2xl px-5 pb-10 pt-6 text-center">
          <Link href="/" aria-label="Voltar ao início" className="inline-block rounded-2xl bg-cream px-4 py-1.5"><Logo className="w-[150px]" /></Link>
          <p className="eyebrow mt-5 !text-gold-light">Encontro {e.numero} · grátis · 10 a 15 min</p>
          <h1 className="mt-1 text-4xl font-black !text-white sm:text-5xl">{e.titulo}</h1>
          <p className="mt-2 text-sm text-white/80">{e.passagem}</p>
        </div>
        <Wave fill="#FFF5DB" />
      </header>
      <article className="mx-auto max-w-2xl px-5 pb-10">
<figure className="-mt-2 mb-8 overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/encontro-1.webp" width={1536} height={1024} alt="Zaqueu sentado num galho da árvore olhando para Jesus, que o chama pelo nome, com o povo ao redor" className="h-auto w-full" fetchPriority="high" />
        </figure>

        <div className="card mb-8">
          <p className="mb-2 font-bold">Versão do encontro</p>
          {!ready ? <div aria-busy="true"><Skeleton className="h-12" /></div> : (
          <div role="group" aria-label="Escolher versão" className="grid grid-cols-2 gap-2">
            {(['curta', 'mais'] as const).map((v) => (
              <button key={v} type="button" aria-pressed={version === v} onClick={() => setVersion(v)}
                className={`min-h-[48px] rounded-full border-2 border-teal font-bold ${version === v ? 'bg-teal text-gold-light' : 'bg-white text-teal'}`}>
                {v === 'curta' ? 'Versão curta' : 'Versão +'}
              </button>
            ))}
          </div>)}
          <p className="mt-3 rounded-xl bg-teal-soft p-3 text-sm" aria-live="polite">
            {version === 'curta'
              ? <><b>Versão curta:</b> história resumida, perguntas simples e atividade rápida. Cerca de 10 minutos.</>
              : <><b>Versão +:</b> história completa, perguntas para aprofundar, atividade com conversa extra e um bloco “Para ir mais fundo”. Cerca de 15 minutos.</>}
          </p>
          {both && <p className="mt-2 text-sm">Como você tem idades diferentes, alterne entre as versões conforme quem estiver com você.</p>}
        </div>

        <section aria-labelledby="h-historia" className="mb-8">
          <h2 id="h-historia" className="mb-3 flex items-center gap-3 text-2xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-black text-teal-dark" aria-hidden="true">1</span>História</h2>
          <div className="card space-y-3 text-lg leading-relaxed">{(version === 'curta' ? e.historiaCurta : e.historia).map((p) => <p key={p}>{p}</p>)}</div>
        </section>

        <section aria-labelledby="h-conversa" className="mb-8">
          <h2 id="h-conversa" className="mb-3 flex items-center gap-3 text-2xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-black text-teal-dark" aria-hidden="true">2</span>Conversa</h2>
          <ol className="space-y-3">{e.perguntas[version].map((q, i) => <li key={q} className="card flex gap-3 text-lg"><span className="font-serif text-2xl font-black text-gold-dark">{i + 1}</span><span>{q}</span></li>)}</ol>
        </section>

        {version === 'mais' && (
          <section aria-labelledby="h-fundo" className="mb-8 rounded-3xl border-2 border-gold bg-white p-5">
            <h2 id="h-fundo" className="mb-2 text-xl font-bold">{e.aprofundamento.titulo}</h2>
            <p>{e.aprofundamento.texto}</p>
          </section>
        )}

        <section aria-labelledby="h-atividade" className="mb-8">
          <h2 id="h-atividade" className="mb-3 flex items-center gap-3 text-2xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-black text-teal-dark" aria-hidden="true">3</span>Atividade fora da tela</h2>
          <div className="card">
            <p className="font-bold">{e.atividade.titulo} · {e.atividade.minutos} min</p>
            <p className="mt-1">{e.atividade.descricao}</p>
            <p className="mt-2 text-sm"><b>Materiais:</b> {e.atividade.materiais}</p>
            {version === 'mais' && <p className="mt-3 rounded-xl bg-teal-soft p-3 text-sm"><b>Extra:</b> {e.atividade.extraMais}</p>}
          </div>
        </section>

        <section aria-labelledby="h-oracao" className="mb-8">
          <h2 id="h-oracao" className="mb-3 flex items-center gap-3 text-2xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-black text-teal-dark" aria-hidden="true">4</span>Oração</h2>
          <p className="card text-lg italic">{e.oracao}</p>
        </section>

        <section className="mb-8 rounded-3xl border-2 border-gold bg-teal-soft p-5">
          <h2 className="mb-2 text-xl font-bold">Plano B: se ele não quiser</h2>
          <p>{e.planoB}</p>
        </section>
        <section className="mb-10 rounded-3xl bg-teal p-5 text-white"><span className="sr-only">Dica</span>
          <h2 className="mb-2 text-xl font-bold !text-gold-light">Dica para pais</h2>
          <p>{e.dicaPais}</p>
        </section>

        {!done ? (
          <section className="card" aria-labelledby="h-avalia">
            <h2 id="h-avalia" className="mb-3 text-xl font-bold">Como foi o encontro?</h2>
            <div role="radiogroup" aria-label="Nota de 1 a 5" className="mb-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} de 5`} onClick={() => setRating(n)}
                  className={`h-12 w-12 rounded-full border-2 border-teal text-lg font-bold ${rating === n ? 'bg-teal text-white' : 'bg-white text-teal'}`}>{n}</button>
              ))}
            </div>
            <button type="button" className="btn-primary w-full disabled:opacity-50" disabled={!rating} onClick={finish}>Fizemos!</button>
            {!rating && <p className="mt-2 text-sm text-ink/70">Escolha uma nota de 1 a 5 para concluir.</p>}
          </section>
        ) : (
          <section className="card text-center" role="status">
            <h2 className="mb-2 text-2xl font-bold">Que bom que vocês fizeram! 🌿</h2>
            <p className="mb-4">Se esse encontro fez sentido para a sua casa, há mais 29 esperando por vocês, um por dia.</p>
            <Link href="/#oferta" className="btn-primary">Conhecer os 30 encontros</Link>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
