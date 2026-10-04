# Laços de Fé — Etapa 1 (funil de entrada)

Landing + quiz + resultado + Encontro 1 grátis + redirecionador de afiliados. Next 14 (export estático), TypeScript, Tailwind, Vitest.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # testes (afiliados, A/B, quiz)
npm run typecheck
npm run build      # gera ./out (estático)
```

## Imagem do produto (hero)
Salve o arquivo em `public/` (ex.: `public/produto.png`) e em `src/config/site.ts` preencha `productImage.src: '/produto.png'` (e `width`/`height` reais). Vazio = aparece um espaço reservado.

## Hook, nome e preço
Tudo em `src/config/site.ts`: `hook.line1/line2`, `brand`, `productName` (provisório), `price`, `guaranteeDays`.

## Adicionar um afiliado
Em `src/config/affiliates.ts`, crie uma chave nova com `name`, `checkoutUrl`, `checkoutUrlB` (opcional), `whatsapp` (só dígitos com DDI, opcional) e `active`. Link do afiliado: `https://seudominio.com/?a=slug`.
Regras: first-touch por 60 dias; novo `?a=` válido sobrescreve; slug inválido é ignorado (console.warn); sem slug vale `default`.
Parâmetros repassados ao checkout: `checkoutParamMap` e `checkoutAffiliateParam` em `site.ts` (TODO: confirmar nomes na Cakto).

## Teste A/B de preço
`abTestEnabled: true` em `site.ts`. Só vale para afiliados com `checkoutUrlB`; sorteio 50/50 uma vez, guardado em localStorage (`lf_ab`) e enviado em todos os eventos (`ab`).

## Medição
`src/lib/track.ts`. Em dev, loga no console. Em produção, se `NEXT_PUBLIC_CF_BEACON_TOKEN` existir, carrega o Cloudflare Web Analytics. Atenção: o Cloudflare mede visitas/páginas, não eventos customizados. Para gravar os eventos (quiz_complete, checkout_click…), use `registerSink(fn)` na próxima etapa (ex.: Supabase).

## Publicar
Defina `NEXT_PUBLIC_SITE_URL` (para o Open Graph) e, opcionalmente, `NEXT_PUBLIC_CF_BEACON_TOKEN`.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Vercel:** importe o repositório; o Next detecta o export estático.

## Links de teste
- `/?a=default`, `/?a=exemplo1&utm_source=tiktok`, `/go?p=principal`
- `/quiz`, `/resultado`, `/encontro-1`, `/privacidade`, `/termos`

## Checklist (TODO)
- [ ] Checkouts reais da Cakto (default e afiliados) e nomes dos parâmetros
- [ ] Imagem do produto e revisão do hook
- [ ] Revisão jurídica de `/privacidade` e `/termos` (depois, `showLegalTodo: false`)
- [ ] Revisão teológica do Encontro 1
- [ ] Domínio + `NEXT_PUBLIC_SITE_URL`; token do Cloudflare Web Analytics
- [ ] WhatsApp real dos afiliados; nome definitivo do produto
- [ ] Depoimentos: só reais, em `src/content/testimonials.ts`
