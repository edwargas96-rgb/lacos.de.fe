import { site } from '@/config/site';

/** Logo da marca. O fundo branco da imagem some sobre fundos claros (mix-blend-multiply). */
export default function Logo({ className = '' }: { className?: string }) {
  const { src, width, height } = site.logo;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={site.brand} width={width} height={height} className={`h-auto mix-blend-multiply ${className}`} />;
}
