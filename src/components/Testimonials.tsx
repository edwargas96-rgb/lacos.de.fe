'use client';
import { useEffect, useState } from 'react';
import { sampleTestimonials, testimonials } from '@/content/testimonials';

/**
 * Mostra só depoimentos reais. Sem eles, a seção some do site público.
 * Para ver o design com modelos: abra /?preview=depoimentos (ou rode em desenvolvimento).
 */
export default function Testimonials() {
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('preview') === 'depoimentos';
    setPreview(q || process.env.NODE_ENV !== 'production');
  }, []);

  const usingSamples = testimonials.length === 0;
  if (usingSamples && !preview) return null;
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
        <ul className="grid gap-4 sm:grid-cols-3">
          {items.map((t) => (
            <li key={t.name + t.text} className="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg">
              <span aria-hidden="true" className="absolute -top-4 left-5 font-serif text-6xl font-black leading-none text-gold">“</span>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">{t.text}</blockquote>
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
