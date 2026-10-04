'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { encontro1 as e } from '@/content/encontro-1';
import { ANSWERS_KEY, defaultVersion, type Answers, type EncounterVersion } from '@/lib/quiz';
import { getStorage, readJSON, writeJSON } from '@/lib/storage';
import { track } from '@/lib/track';
import TrackView from '@/components/TrackView';
import Footer from '@/components/Footer';
import { Encontro1Illustration } from '@/components/Illustrations';

const DONE_KEY = 'lf_e1_done';
interface Done { rating: number }

export default function Encontro1Page() {
  const [version, setVersion] = useState<EncounterVersion>('curta');
  const [both, setBoth] = useState(false);
  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);

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
      <article className="mx-auto max-w-2xl px-5 py-8">
        <Link href="/" className="inline-flex min-h-[44px] items-center text-sm font-bold text-teal underline">← Voltar ao início</Link>
        <p className="mt-2 text-sm font-bold uppercase tracking-wider text-gold-dark">Encontro {e.numero} · grátis · 10 a 15 min</p>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{e.titulo}</h1>
        <p className="mt-1 text-sm text-ink/70">{e.passagem}</p>

        <Encontro1Illustration className="my-6 h-auto w-full" />

        <div className="card mb-8">
          <p className="mb-2 font-bold">Versão do encontro</p>
          <div role="group" aria-label="Escolher versão" className="grid grid-cols-2 gap-2">
            {(['curta', 'mais'] as const).map((v) => (
              <button key={v} type="button" aria-pressed={version === v} onClick={() => setVersion(v)}
                className={`min-h-[48px] rounded-full border-2 border-teal font-bold ${version === v ? 'bg-teal text-white' : 'bg-white text-teal'}`}>
                {v === 'curta' ? 'Versão curta' : 'Versão +'}
              </button>
            ))}
          </div>
          {both && <p className="mt-2 text-sm">Como você tem idades diferentes, alterne entre as versões conforme quem estiver com você.</p>}
        </div>

        <section aria-labelledby="h-historia" className="mb-8">
          <h2 id="h-historia" className="mb-3 text-2xl font-bold">1 · História</h2>
          <div className="space-y-3 text-lg leading-relaxed">{e.historia.map((p) => <p key={p}>{p}</p>)}</div>
        </section>

        <section aria-labelledby="h-conversa" className="mb-8">
          <h2 id="h-conversa" className="mb-3 text-2xl font-bold">2 · Conversa</h2>
          <ol className="list-decimal space-y-3 pl-6 text-lg">{e.perguntas[version].map((q) => <li key={q}>{q}</li>)}</ol>
        </section>

        <section aria-labelledby="h-atividade" className="mb-8">
          <h2 id="h-atividade" className="mb-3 text-2xl font-bold">3 · Atividade fora da tela</h2>
          <div className="card">
            <p className="font-bold">{e.atividade.titulo} · {e.atividade.minutos} min</p>
            <p className="mt-1">{e.atividade.descricao}</p>
            <p className="mt-2 text-sm"><b>Materiais:</b> {e.atividade.materiais}</p>
          </div>
        </section>

        <section aria-labelledby="h-oracao" className="mb-8">
          <h2 id="h-oracao" className="mb-3 text-2xl font-bold">4 · Oração</h2>
          <p className="card text-lg italic">{e.oracao}</p>
        </section>

        <section className="mb-8 rounded-2xl bg-teal-soft p-5">
          <h2 className="mb-2 text-xl font-bold">Plano B: se ele não quiser</h2>
          <p>{e.planoB}</p>
        </section>
        <section className="mb-10 rounded-2xl bg-sand p-5">
          <h2 className="mb-2 text-xl font-bold">Dica para pais</h2>
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
