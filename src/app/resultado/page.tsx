'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ANSWERS_KEY, computeResult, isComplete, type Answers } from '@/lib/quiz';
import { getStorage, readJSON } from '@/lib/storage';
import { getAttribution } from '@/lib/attribution';
import { AFFILIATES } from '@/config/affiliates';
import TrackView from '@/components/TrackView';
import Offer from '@/components/Offer';
import Footer from '@/components/Footer';
import UnlockMessage from '@/components/UnlockMessage';
import { unlock } from '@/lib/unlock';
import Skeleton from '@/components/Skeleton';
import { Sun } from '@/components/Illustrations';

export default function ResultadoPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [whatsapp, setWhatsapp] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState(0);
  const MESSAGES = ['Lendo as suas respostas…', 'Escolhendo o seu ponto de partida…', 'Separando o Encontro 1 para vocês…'];

  useEffect(() => {
    const store = getStorage();
    const saved = readJSON<Answers>(store, ANSWERS_KEY);
    setAnswers(saved);
    if (isComplete(saved)) unlock('quiz', store);
    const slug = getAttribution(store).slug;
    setWhatsapp(AFFILIATES[slug]?.whatsapp);
    // Pequena pausa de "montagem" do resultado (mais curta para quem prefere menos movimento).
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 300 : 2400;
    const steps = [0, 1, 2].map((i) => setTimeout(() => setMsg(i), (total / 3) * i));
    const done = setTimeout(() => setReady(true), total);
    return () => [...steps, done].forEach(clearTimeout);
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl px-5 py-12" aria-busy="true">
        <div className="mb-8 flex flex-col items-center text-center">
          <Sun className="h-20 w-20 animate-spin [animation-duration:6s]" />
          <p role="status" aria-live="polite" className="mt-4 font-serif text-xl font-bold text-teal">{MESSAGES[msg]}</p>
          <div className="mt-4 h-2 w-48 overflow-hidden rounded-full bg-sand"><div className="h-full w-1/2 animate-pulse rounded-full bg-gold" /></div>
        </div>
        <Skeleton className="mb-4 h-10 w-11/12" />
        <Skeleton className="mb-4 h-28" />
        <Skeleton className="mb-4 h-16" />
        <Skeleton className="h-14" />
      </div>
    );
  }

  if (!isComplete(answers)) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Ainda não temos suas respostas</h1>
        <p className="mb-6">Responda ao quiz de 1 minuto para ver o seu ponto de partida.</p>
        <Link href="/quiz" className="btn-primary">Fazer o quiz</Link>
      </div>
    );
  }

  const r = computeResult(answers);
  return (
    <>
      <TrackView event="view_resultado" />
      <section className="mx-auto max-w-xl px-5 py-10 [background-image:radial-gradient(70%_20%_at_50%_0%,rgba(255,214,107,.5),transparent)]">
        <p className="eyebrow">Seu resultado</p>
        <h1 className="mb-5 mt-2 text-3xl font-bold leading-tight">{r.title}</h1>
        <p className="card text-lg">{r.tip}</p>
        {r.timeTip && <p className="mt-4">{r.timeTip}</p>}
        {r.moment && (
          <p className="mt-4 rounded-2xl border border-gold/40 bg-teal-soft p-4"><b>Seu melhor momento:</b> {r.moment}.</p>
        )}
        {r.insights.length > 0 && (
          <div className="mt-8 rounded-3xl bg-teal-dark p-6 text-white shadow-xl">
            <p className="eyebrow !text-gold-light">O que suas respostas mostram</p>
            <h2 className="mt-1 text-2xl font-bold !text-white">Por que o Laços de Fé combina com a sua casa</h2>
            <ul className="mt-4 space-y-3">
              {r.insights.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-teal-dark">✓</span>
                  <span className="text-white/95">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8"><UnlockMessage via="quiz" /></div>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/encontro-1" className="btn-primary">Fazer o Encontro 1 grátis</Link>
          {whatsapp && (
            <a className="btn-secondary" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
              Tirar uma dúvida no WhatsApp
            </a>
          )}
        </div>
      </section>
      <Offer lead="Quer continuar com os 30 encontros?" />
      <Footer />
    </>
  );
}
