'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/** Barra fixa no rodapé: aparece depois da hero e some quando a oferta entra na tela. */
export default function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [onOffer, setOnOffer] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 380);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const offer = document.getElementById('oferta');
    let io: IntersectionObserver | undefined;
    if (offer && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => setOnOffer(e.isIntersecting), { threshold: 0.15 });
      io.observe(offer);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !onOffer;
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/60 bg-cream/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(10,26,69,.35)] backdrop-blur transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-xl gap-2">
        <Link tabIndex={show ? 0 : -1} href="/quiz" className="btn-primary flex-1 !px-3 text-center !text-sm sm:!text-base">Fazer o quiz de 1 minuto</Link>
        <Link tabIndex={show ? 0 : -1} href="/encontro-1" className="btn-secondary !px-4 !text-sm sm:!text-base">Dia 1 grátis</Link>
      </div>
    </div>
  );
}
