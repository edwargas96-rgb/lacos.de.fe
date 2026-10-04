/** Mockup em HTML/CSS de uma tela de "Encontro". */
export default function MockupApp() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] border-[6px] border-teal-dark bg-cream p-3 shadow-xl" role="img" aria-label="Exemplo da tela de um encontro no celular: história, três perguntas, atividade e oração">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-teal-dark/30" />
      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">Encontro 1 · 15 min</p>
      <p className="font-serif text-lg font-bold leading-tight text-teal-dark">Zaqueu e a árvore</p>
      <div className="mt-2 flex gap-1 text-[10px] font-bold">
        <span className="rounded-full bg-teal px-2 py-0.5 text-white">Versão curta</span>
        <span className="rounded-full bg-teal-soft px-2 py-0.5 text-teal">Versão +</span>
      </div>
      <div className="mt-3 space-y-2 text-[11px] leading-snug">
        <div className="rounded-xl bg-white p-2"><b className="text-teal">1 · História</b><br />Zaqueu era um homem rico e baixinho…</div>
        <div className="rounded-xl bg-white p-2"><b className="text-teal">2 · Três perguntas</b><br />Por que Zaqueu subiu na árvore?</div>
        <div className="rounded-xl bg-white p-2"><b className="text-teal">3 · Fora da tela</b><br />Escada de nomes · 5 min</div>
        <div className="rounded-xl bg-white p-2"><b className="text-teal">4 · Oração</b><br />Deus, obrigado porque o Senhor conhece…</div>
      </div>
      <div className="mt-3 rounded-full bg-teal py-2 text-center text-xs font-bold text-white">Fizemos!</div>
    </div>
  );
}
