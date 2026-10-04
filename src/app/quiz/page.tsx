'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANSWERS_KEY, QUESTIONS, type Answers } from '@/lib/quiz';
import { getStorage, readJSON, writeJSON } from '@/lib/storage';
import { track } from '@/lib/track';
import Logo from '@/components/Logo';
import Skeleton from '@/components/Skeleton';
import { Hills, Sun } from '@/components/Illustrations';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setAnswers(readJSON<Answers>(getStorage(), ANSWERS_KEY) ?? {});
    setReady(true);
    const t = setTimeout(() => track('quiz_start'), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (ready) heading.current?.focus();
  }, [step, ready]);

  const q = QUESTIONS[step];
  const chosen = answers[q.id];
  const last = step === QUESTIONS.length - 1;

  function choose(id: string) {
    const next = { ...answers, [q.id]: id };
    setAnswers(next);
    writeJSON(getStorage(), ANSWERS_KEY, next);
  }

  function advance() {
    if (!chosen) return;
    if (last) {
      setLeaving(true);
      track('quiz_complete');
      router.push('/resultado');
    } else setStep(step + 1);
  }

  const pct = Math.round(((step + (chosen ? 1 : 0)) / QUESTIONS.length) * 100);

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream [background-image:radial-gradient(70%_35%_at_50%_0%,rgba(255,214,107,.6),transparent)]">
      <Sun className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-60" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-24 pt-6">
        <Logo className="mx-auto w-[200px]" />

        <div className="mb-7 mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-extrabold text-teal">
            <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
            <span className="text-gold-dark">{pct}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progresso do quiz">
            <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {!ready ? (
          <div aria-busy="true" aria-label="Carregando pergunta" className="space-y-3">
            <Skeleton className="h-16 w-4/5" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        ) : (
          <fieldset className="flex-1">
            <legend className="sr-only">{q.title}</legend>
            <h1 ref={heading} tabIndex={-1} className="mb-6 text-2xl font-bold leading-snug outline-none sm:text-3xl">{q.title}</h1>
            <div className="space-y-3">
              {q.options.map((o, i) => {
                const on = chosen === o.id;
                return (
                  <label key={o.id}
                    className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 font-bold transition-colors focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-teal ${on ? 'border-teal bg-gold text-teal-dark shadow-md' : 'border-gold/40 bg-white hover:border-gold'}`}>
                    <input type="radio" name={q.id} value={o.id} checked={on} onChange={() => choose(o.id)} className="sr-only" />
                    <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${on ? 'bg-teal text-gold-light' : 'bg-sand text-teal-dark'}`}>
                      {on ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex gap-3">
          <button type="button" className="btn-secondary" onClick={() => (step === 0 ? router.push('/') : setStep(step - 1))}>Voltar</button>
          <button type="button" className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50" disabled={!chosen || leaving} onClick={advance}>
            {leaving ? 'Preparando…' : last ? 'Ver meu resultado' : 'Continuar'}
          </button>
        </div>
      </div>
      <Hills className="pointer-events-none absolute bottom-0 left-0 block h-16 w-full" />
    </div>
  );
}
