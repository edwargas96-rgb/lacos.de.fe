import { site } from '@/config/site';

/** Espaço da imagem do produto. Defina site.productImage.src em src/config/site.ts. */
export default function ProductImageSlot() {
  const { src, alt, width, height } = site.productImage;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className="h-auto w-full rounded-2xl shadow-lg" fetchPriority="high" />;
  }
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal/40 bg-white/60 p-6 text-center"
      role="img"
      aria-label="Espaço reservado para a imagem do produto"
    >
      <span className="font-serif text-lg font-semibold text-teal">Espaço da imagem do produto</span>
      <span className="max-w-xs text-sm text-ink/70">
        Salve a imagem em <code>public/</code> e preencha <code>productImage.src</code> em <code>src/config/site.ts</code>.
      </span>
    </div>
  );
}
