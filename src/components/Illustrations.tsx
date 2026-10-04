/** SVGs próprios, planos e simples. Decorativos (aria-hidden). */

export function Sun({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className={className}>
      <g stroke="#D4A94F" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={60 + Math.cos(a) * 38} y1={60 + Math.sin(a) * 38} x2={60 + Math.cos(a) * 52} y2={60 + Math.sin(a) * 52} />;
        })}
      </g>
      <circle cx="60" cy="60" r="28" fill="#D4A94F" />
    </svg>
  );
}

export function Hills({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 100" preserveAspectRatio="none" className={className}>
      <path d="M0 60 Q80 10 160 55 T320 45 T400 60 V100 H0Z" fill="#D9E7E8" />
      <path d="M0 80 Q100 40 200 75 T400 70 V100 H0Z" fill="#0F4C5C" opacity=".9" />
    </svg>
  );
}

/** Ilustração do Encontro 1: Zaqueu na árvore, Jesus (figura abstrata) e sol. */
export function Encontro1Illustration({ className = '' }: { className?: string }) {
  return (
    <svg role="img" aria-label="Ilustração: uma árvore com uma figura sentada nos galhos e outra figura embaixo, sob o sol" viewBox="0 0 360 220" className={className}>
      <rect width="360" height="220" rx="18" fill="#FBF6EC" />
      <g transform="translate(262 20) scale(.55)">
        <Sun />
      </g>
      <path d="M0 170 Q90 130 180 165 T360 150 V220 H0Z" fill="#D9E7E8" />
      <path d="M0 190 Q120 160 240 188 T360 180 V220 H0Z" fill="#0F4C5C" />
      {/* árvore */}
      <rect x="96" y="100" width="16" height="84" rx="6" fill="#8A6A1F" />
      <circle cx="104" cy="78" r="36" fill="#2F7A6B" />
      <circle cx="78" cy="96" r="24" fill="#2F7A6B" />
      <circle cx="132" cy="94" r="26" fill="#3C8F7E" />
      {/* Zaqueu na árvore */}
      <circle cx="108" cy="72" r="9" fill="#F1E8D6" />
      <path d="M96 100 q12 -22 24 0z" fill="#D4A94F" />
      {/* Jesus (abstrato) */}
      <circle cx="210" cy="132" r="11" fill="#F1E8D6" stroke="#0A3640" strokeWidth="2" />
      <path d="M190 192 q20 -56 40 0z" fill="#FBF6EC" stroke="#0A3640" strokeWidth="2" />
      {/* olhar para cima */}
      <path d="M196 120 Q160 100 124 82" stroke="#D4A94F" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
    </svg>
  );
}
