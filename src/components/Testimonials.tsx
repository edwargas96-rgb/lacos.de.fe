import { testimonials } from '@/content/testimonials';

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section" aria-labelledby="depoimentos">
      <h2 id="depoimentos" className="mb-6 text-2xl font-bold sm:text-3xl">Quem já usou</h2>
      <ul className="space-y-4">
        {testimonials.map((t) => (
          <li key={t.name} className="card">
            <blockquote>“{t.text}”</blockquote>
            <p className="mt-2 text-sm font-bold">{t.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
