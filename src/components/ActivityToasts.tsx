'use client';
import { useEffect, useState } from 'react';
import { activity } from '@/content/activity';

/** Mostra, em rodízio, mensagens REAIS de src/content/activity.ts. Sem itens, não renderiza nada. */
export default function ActivityToasts() {
  const [i, setI] = useState(-1);

  useEffect(() => {
    if (activity.length === 0) return;
    let n = 0;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      setI(n % activity.length);
      n += 1;
      hide = setTimeout(() => setI(-1), 5000);
    };
    const first = setTimeout(show, 4000);
    const loop = setInterval(show, 14000);
    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(loop);
    };
  }, []);

  if (activity.length === 0 || i < 0) return null;
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-4 left-4 z-40 max-w-[300px] rounded-2xl border border-gold bg-white p-3 text-sm font-semibold text-teal-dark shadow-xl">
      {activity[i]}
    </div>
  );
}
