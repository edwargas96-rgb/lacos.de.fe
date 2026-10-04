import Link from 'next/link';

/** Par de CTAs (quiz + Encontro 1 grátis) para repetir ao longo da landing. */
export default function CtaPair({ dark = false, onGold = false, className = '' }: { dark?: boolean; onGold?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center ${className}`}>
      <Link href="/quiz" className={onGold ? 'btn-navy' : 'btn-primary'}>Fazer o quiz de 1 minuto</Link>
      <Link href="/encontro-1" className={dark ? 'btn-light' : 'btn-secondary'}>Ver o Encontro 1 grátis</Link>
    </div>
  );
}
