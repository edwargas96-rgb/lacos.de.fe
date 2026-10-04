/** Área de carregamento (decorativa). Use dentro de um container com aria-busy. */
export default function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}
