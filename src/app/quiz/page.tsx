'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANSWERS_KEY, QUESTIONS, STEPS, levelFor, readingTimeMs, xpFor, XP_PER_ANSWER, type Answers } from '@/lib/quiz';
import { getStorage, readJSON, writeJSON } from '@/lib/storage';
import { track } from '@/lib/track';
import { unlock } from '@/lib/unlock';
import Logo from '@/components/Logo';
import Skeleton from '@/components/Skeleton';
import GrowingTree from '@/components/GrowingTree';
import { Hills, Sun } from '@/components/Illustrations';

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [seenFb, setSeenFb] = useState<string[]>([]);
  const [fbReady, setFbReady] = useState(false);
  const [gain, setGain] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setAnswers(readJSON<Answers>(getStorage(), ANSWERS_KEY) ?? {});
    setReady(true);
    const t = setTimeout(() => track('quiz_start'), 0);
    return () => clearTimeout(t);
  }, []);

  const step = STEPS[index];
  const answeredCount = QUESTIONS.filter((q) => answers[q.id]).length;
  const xp = xpFor(answeredCount, seenFb.length);
  const level = levelFor(xp);
  const pct = Math.round((answeredCount / QUESTIONS.length) * 100);
  const questionNumber = STEPS.slice(0, index + 1).filter((s) => s.type === 'q').length;

  const fbText = useMemo(() => (step.type === 'fb' ? step.feedback.text(answers) : ''), [step, answers]);
  const fbMs = step.type === 'fb' && !seenFb.includes(step.feedback.id) ? readingTimeMs(fbText) : 0;

  useEffect(() => {
    if (!ready) return;
    heading.current?.focus();
    if (step.type !== 'fb') return;
    setFbReady(fbMs === 0);
    if (fbMs === 0) return;
    const t = setTimeout(() => setFbReady(true), fbMs);
    return () => clearTimeout(t);
  }, [index, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  function flashGain(msg: string) {
    setGain(msg);
    setTimeout(() => setGain(null), 1600);
  }

  function choose(qid: string, optionId: string) {
    const next = { ...answers, [qid]: optionId };
    if (!answers[qid]) flashGain(`+${XP_PER_ANSWER} XP`);
    setAnswers(next);
    writeJSON(getStorage(), ANSWERS_KEY, next);
  }

  function next() {
    if (step.type === 'fb') {
      if (!seenFb.includes(step.feedback.id)) {
        setSeenFb([...seenFb, step.feedback.id]);
        flashGain(`Conquista: ${step.feedback.badge}`);
      }
    }
    if (index === STEPS.length - 1) {
      setLeaving(true);
      track('quiz_complete', { xp });
      if (unlock('quiz', getStorage())) track('offer_unlocked', { via: 'quiz' });
      router.push('/resultado');
    } else setIndex(index + 1);
  }

  const chosen = step.type === 'q' ? answers[step.question.id] : undefined;
  const canContinue = step.type === 'q' ? !!chosen : fbReady;

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream [background-image:radial-gradient(70%_35%_at_50%_0%,rgba(255,214,107,.6),transparent)]">
      <Sun className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-60" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-28 pt-6">
        <Logo className="mx-auto w-[190px]" />

        {/* Placar: nível, XP e árvore */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gold/50 bg-white/80 p-3 shadow-sm">
          <GrowingTree stage={level.index} className="h-14 w-14 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-sm font-extrabold text-teal-dark">
              <span>Nível: {level.name}</span>
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs">{xp} XP</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progresso do quiz">
              <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-xs font-semibold text-ink/70">
              {step.type === 'q' ? `Pergunta ${questionNumber} de ${QUESTIONS.length}` : 'Um instante para ler'}
            </p>
          </div>
        </div>
        <p role="status" aria-live="polite" className="h-6 text-center text-sm font-extrabold text-gold-dark">{gain}</p>

        {!ready ? (
          <div aria-busy="true" aria-label="Carregando pergunta" className="space-y-3">
            <Skeleton className="h-16 w-4/5" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        ) : step.type === 'q' ? (
          <fieldset className="flex-1" key={step.question.id}>
            <legend className="sr-only">{step.question.title}</legend>
            <h1 ref={heading} tabIndex={-1} className="mb-6 text-2xl font-bold leading-snug outline-none sm:text-3xl">{step.question.title}</h1>
            <div className="space-y-3">
              {step.question.options.map((o, i) => {
                const on = chosen === o.id;
                return (
                  <label key={o.id}
                    className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 font-bold transition-all focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-teal ${on ? 'scale-[1.02] border-teal bg-gold text-teal-dark shadow-md' : 'border-gold/40 bg-white hover:border-gold'}`}>
                    <input type="radio" name={step.question.id} value={o.id} checked={on} onChange={() => choose(step.question.id, o.id)} className="sr-only" />
                    <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${on ? 'bg-teal text-gold-light' : 'bg-sand text-teal-dark'}`}>
                      {on ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <section key={step.feedback.id} className="flex-1" aria-labelledby="fb-title">
            <div className="rounded-3xl border-2 border-gold bg-teal-dark p-6 text-white shadow-xl">
              <p className="eyebrow !text-gold-light">Conquista desbloqueada</p>
              <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-sm font-extrabold text-teal-dark">★ {step.feedback.badge}</p>
              <h1 id="fb-title" ref={heading} tabIndex={-1} className="mt-4 text-2xl font-bold leading-snug !text-white outline-none">{step.feedback.title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-white/95">{fbText}</p>
              {fbMs > 0 && (
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/20" aria-hidden="true">
                  <div className="h-full rounded-full bg-gold-light" style={{ width: fbReady ? '100%' : '0%', transition: `width ${fbMs}ms linear` }} ref={(el) => { if (el && !fbReady) requestAnimationFrame(() => { el.style.width = '100%'; }); }} />
                </div>
              )}
            </div>
          </section>
        )}

        <div className="mt-8 flex gap-3">
          <button type="button" className="btn-secondary" onClick={() => (index === 0 ? router.push('/') : setIndex(index - 1))}>Voltar</button>
          <button type="button" className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50" disabled={!canContinue || leaving} onClick={next}>
            {leaving ? 'Preparando…' : step.type === 'fb' && !fbReady ? 'Leia com calma…' : index === STEPS.length - 1 ? 'Ver meu resultado' : 'Continuar'}
          </button>
        </div>
      </div>
      <Hills className="pointer-events-none absolute bottom-0 left-0 block h-16 w-full" />
    </div>
  );
}
