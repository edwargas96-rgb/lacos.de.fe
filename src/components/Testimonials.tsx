'use client';
import { useEffect, useRef, useState } from 'react';
import { sampleTestimonials, testimonials } from '@/content/testimonials';

/**
 * Mostra só depoimentos reais. Sem eles, a seção some do site público.
 * Para ver o design com modelos: abra /?preview=depoimentos (ou rode em desenvolvimento).
 * Os cartões entram com uma animação suave ao aparecer na tela.
 */
export default function Testimonials() {
  const [preview, setPreview] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('preview') === 'depoimentos';
    setPreview(q || process.env.NODE_ENV !== 'production');
  }, []);

  const usingSamples = testimonials.length === 0;
  const visible = !usingSamples || preview;

  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  if (!visible) return null;
  const items = usingSamples ? sampleTestimonials : testimonials;

  return (
    <section className="bg-cream" aria-labelledby="depoimentos">
      <div className="section">
        <p className="eyebrow text-center">Quem já começou</p>
        <h2 id="depoimentos" className="mb-8 mt-1 text-center text-2xl font-extrabold sm:text-4xl">Famílias que já utilizam</h2>
        {usingSamples && (
          <p className="mb-6 rounded-xl border-2 border-dashed border-gold-dark bg-white p-3 text-center text-sm font-bold text-gold-dark">
            EXEMPLO: modelos de texto, não são pessoas reais. Troque em src/content/testimonials.ts. Esta faixa só aparece em pré-visualização.
          </p>
        )}
        <ul ref={ref} className={`grid gap-5 ${items.length === 1 ? 'mx-auto max-w-md' : 'sm:grid-cols-2'}`}>
          {items.map((t, i) => (
            <li
              key={t.name + t.text}
              style={{ transitionDelay: `${i * 140}ms` }}
              className={`relative flex flex-col rounded-3xl bg-white p-6 shadow-lg transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-2xl ${seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            >
              <span aria-hidden="true" className={`absolute -top-4 left-5 font-serif text-6xl font-black leading-none text-gold transition-transform duration-700 ${seen ? 'scale-100' : 'scale-50'}`}>“</span>
              {t.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.image.src} width={t.image.width} height={t.image.height} alt={t.image.alt} loading="lazy" className="mt-4 h-auto w-full rounded-2xl border border-sand" />
              )}
              <blockquote className={`flex-1 text-lg leading-relaxed ${t.image ? 'mt-4' : 'mt-4'}`}>{t.text}</blockquote>
              <figcaption className="mt-4 border-t border-gold/30 pt-3">
                <p className="font-serif text-lg font-bold text-teal-dark">{t.name}</p>
                {t.detail && <p className="text-sm text-ink/70">{t.detail}</p>}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
