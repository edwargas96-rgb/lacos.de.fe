import Link from 'next/link';
import { site } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-sand/50">
      <div className="mx-auto max-w-3xl px-5 pb-28 pt-10 text-sm text-ink/80">
        <p className="mb-4">{site.disclaimer}</p>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-1">
          <Link className="inline-flex min-h-[44px] items-center underline" href="/privacidade">Privacidade</Link>
          <Link className="inline-flex min-h-[44px] items-center underline" href="/termos">Termos</Link>
        </nav>
        <p className="mt-2">© {site.brand}</p>
      </div>
    </footer>
  );
}
