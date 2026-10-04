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

export default function ResultadoPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [whatsapp, setWhatsapp] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const store = getStorage();
    setAnswers(readJSON<Answers>(store, ANSWERS_KEY));
    const slug = getAttribution(store).slug;
    setWhatsapp(AFFILIATES[slug]?.whatsapp);
    setReady(true);
  }, []);

  if (!ready) return null;

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
      <section className="mx-auto max-w-xl px-5 py-10">
        <h1 className="mb-5 text-3xl font-bold leading-tight">{r.title}</h1>
        <p className="card text-lg">{r.tip}</p>
        {r.timeTip && <p className="mt-4">{r.timeTip}</p>}
        {r.moment && (
          <p className="mt-4 rounded-2xl bg-teal-soft p-4"><b>Seu melhor momento:</b> {r.moment}.</p>
        )}
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
