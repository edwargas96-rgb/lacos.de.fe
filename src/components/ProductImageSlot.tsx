import { site } from '@/config/site';

/** Imagem do produto. Defina site.productImage.src em src/config/site.ts. */
export default function ProductImageSlot() {
  const { src, alt, width, height } = site.productImage;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className="mx-auto h-auto w-full max-w-[330px] drop-shadow-[0_24px_30px_rgba(12,26,61,.28)]" fetchPriority="high" />;
  }
  return (
    <div className="flex aspect-[2/3] w-full max-w-[330px] mx-auto flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-gold bg-white/60 p-6 text-center" role="img" aria-label="Espaço reservado para a imagem do produto">
      <span className="font-serif text-lg font-semibold text-teal">Espaço da imagem do produto</span>
      <span className="text-sm text-ink/70">Preencha <code>productImage.src</code> em <code>src/config/site.ts</code>.</span>
    </div>
  );
}
