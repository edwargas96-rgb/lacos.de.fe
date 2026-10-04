/** Árvore que cresce conforme o nível (0 a 4). Decorativa. */
export default function GrowingTree({ stage, className = '' }: { stage: number; className?: string }) {
  const s = Math.max(0, Math.min(4, stage));
  const crown = [0, 14, 22, 30, 38][s];
  const trunk = [4, 14, 24, 34, 42][s];
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <ellipse cx="50" cy="92" rx="34" ry="6" fill="#14295F" opacity=".15" />
      <rect x="46" y={90 - trunk} width="8" height={trunk} rx="3" fill="#8A5400" />
      {s === 0 && <ellipse cx="50" cy="86" rx="9" ry="6" fill="#EBA823" />}
      {s > 0 && (
        <g className="origin-bottom transition-transform duration-700">
          <circle cx="50" cy={86 - trunk - crown * 0.3} r={crown} fill="#2F8F6B" />
          {s >= 2 && <circle cx={50 - crown * 0.6} cy={90 - trunk} r={crown * 0.6} fill="#3FA37A" />}
          {s >= 3 && <circle cx={50 + crown * 0.6} cy={90 - trunk} r={crown * 0.6} fill="#27795A" />}
          {s >= 4 && (
            <>
              <circle cx="40" cy="38" r="3.5" fill="#EBA823" />
              <circle cx="58" cy="30" r="3.5" fill="#EBA823" />
              <circle cx="66" cy="46" r="3.5" fill="#EBA823" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
