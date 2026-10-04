'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANSWERS_KEY, QUESTIONS, type Answers } from '@/lib/quiz';
import { getStorage, readJSON, writeJSON } from '@/lib/storage';
import { track } from '@/lib/track';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setAnswers(readJSON<Answers>(getStorage(), ANSWERS_KEY) ?? {});
    const t = setTimeout(() => track('quiz_start'), 0);
    started.current = true;
    return () => clearTimeout(t);
  }, []);

  useEffect(() => heading.current?.focus(), [step]);

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
      track('quiz_complete');
      router.push('/resultado');
    } else setStep(step + 1);
  }

  const pct = Math.round((step / QUESTIONS.length) * 100);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-teal">
          <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progresso do quiz">
          <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <fieldset className="flex-1">
        <legend className="sr-only">{q.title}</legend>
        <h1 ref={heading} tabIndex={-1} className="mb-6 text-2xl font-bold leading-snug outline-none sm:text-3xl">{q.title}</h1>
        <div className="space-y-3">
          {q.options.map((o) => (
            <label
              key={o.id}
              className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 font-semibold focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-teal ${chosen === o.id ? 'border-teal bg-teal-soft' : 'border-sand'}`}
            >
              <input type="radio" name={q.id} value={o.id} checked={chosen === o.id} onChange={() => choose(o.id)} className="h-5 w-5 accent-[#0F4C5C]" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex gap-3">
        <button type="button" className="btn-secondary" onClick={() => (step === 0 ? router.push('/') : setStep(step - 1))}>Voltar</button>
        <button type="button" className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50" disabled={!chosen} onClick={advance}>
          {last ? 'Ver meu resultado' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}
