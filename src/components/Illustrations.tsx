/** SVGs próprios, planos e simples. Decorativos (aria-hidden). */

export function Sun({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className={className}>
      <g stroke="#EBA823" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={60 + Math.cos(a) * 38} y1={60 + Math.sin(a) * 38} x2={60 + Math.cos(a) * 52} y2={60 + Math.sin(a) * 52} />;
        })}
      </g>
      <circle cx="60" cy="60" r="28" fill="#EBA823" />
    </svg>
  );
}

export function Hills({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 100" preserveAspectRatio="none" className={className}>
      <path d="M0 60 Q80 10 160 55 T320 45 T400 60 V100 H0Z" fill="#FDEBB8" />
      <path d="M0 80 Q100 40 200 75 T400 70 V100 H0Z" fill="#14295F" opacity=".9" />
    </svg>
  );
}

/** Ilustração do Encontro 1: Zaqueu na árvore, Jesus (figura abstrata) e sol. */
export function Encontro1Illustration({ className = '' }: { className?: string }) {
  return (
    <svg role="img" aria-label="Ilustração: uma árvore com uma figura sentada nos galhos e outra figura embaixo, sob o sol" viewBox="0 0 360 220" className={className}>
      <rect width="360" height="220" rx="18" fill="#FFF5DB" />
      <g transform="translate(262 20) scale(.55)">
        <Sun />
      </g>
      <path d="M0 170 Q90 130 180 165 T360 150 V220 H0Z" fill="#FDEBB8" />
      <path d="M0 190 Q120 160 240 188 T360 180 V220 H0Z" fill="#14295F" />
      {/* árvore */}
      <rect x="96" y="100" width="16" height="84" rx="6" fill="#8A5400" />
      <circle cx="104" cy="78" r="36" fill="#2F7A6B" />
      <circle cx="78" cy="96" r="24" fill="#2F7A6B" />
      <circle cx="132" cy="94" r="26" fill="#3C8F7E" />
      {/* Zaqueu na árvore */}
      <circle cx="108" cy="72" r="9" fill="#F8E2A6" />
      <path d="M96 100 q12 -22 24 0z" fill="#EBA823" />
      {/* Jesus (abstrato) */}
      <circle cx="210" cy="132" r="11" fill="#F8E2A6" stroke="#0A1A45" strokeWidth="2" />
      <path d="M190 192 q20 -56 40 0z" fill="#FFF5DB" stroke="#0A1A45" strokeWidth="2" />
      {/* olhar para cima */}
      <path d="M196 120 Q160 100 124 82" stroke="#EBA823" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Divisor ondulado entre seções. `fill` é a cor da seção de BAIXO. */
export function Wave({ fill, className = '' }: { fill: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 40" preserveAspectRatio="none" className={`block h-8 w-full sm:h-12 ${className}`}>
      <path d="M0 22 Q50 2 100 18 T200 18 T300 18 T400 14 V40 H0Z" fill={fill} />
    </svg>
  );
}

/** Raios dourados decorativos. */
export function Rays({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" className={className}>
      <g stroke="#FFD66B" strokeWidth="3" strokeLinecap="round" opacity=".55">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          return <line key={i} x1={200 + Math.cos(a) * 90} y1={200 + Math.sin(a) * 90} x2={200 + Math.cos(a) * 190} y2={200 + Math.sin(a) * 190} />;
        })}
      </g>
    </svg>
  );
}

export function Icon({ name, className = 'h-6 w-6' }: { name: 'calendar' | 'book' | 'layers' | 'check' | 'heart' | 'shield'; className?: string }) {
  const paths: Record<string, string> = {
    calendar: 'M7 2v3M17 2v3M3 8h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 1 2-2h13',
    layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
    check: 'M5 13l4 4L19 7',
    heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5L16 9.5',
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
