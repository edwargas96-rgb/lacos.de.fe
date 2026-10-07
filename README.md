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

## Página de obrigado (`/obrigado`)
Configure na Cakto o redirecionamento depois do pagamento para `https://SEU-DOMINIO/obrigado`. Preencha `support.whatsapp` e `support.membersUrl` em `src/config/site.ts` (sem eles, os botões ficam ocultos). A página não é indexada pelo Google.

## Promoção de/por
`promo` em `src/config/site.ts` (`enabled`, `fullPrice`, `label`). O preço `price` precisa ser o MESMO do checkout da Cakto. O preço cheio tem que ser real.

## Garantias, preços e encontros avulsos
- Preços: `price` (30 encontros) e `priceSingle` (R$ 19,90 por encontro) em `src/config/site.ts`.
- Garantias: `guaranteeDays` (7, incondicional) e `guarantee30Days` (30, "faça os encontros e, se nada mudou, 100% de volta"). TODO: configurar o prazo no produto da Cakto e definir o que vale como comprovação (ex.: registro dos encontros enviado por WhatsApp). Ajustar `/termos`.
- Avulso: `/avulso` (marca vários encontros de 2 a 30, mínimo `avulsoMinimum` = 5) -> `/go?p=avulso&n=3,7,9`. O total é quantidade x `priceSingle`. TODO Cakto: o checkout cobra valor fixo, então crie uma oferta por quantidade (5, 6, 7…) com preço = quantidade x R$ 19,90 e cadastre em `checkoutUrlAvulsoByQty`; sem a quantidade, usa `checkoutUrlAvulso`. Cada afiliado pode ter `checkoutUrlAvulso`; sem ele usa o do `default`. O número do encontro vai ao checkout no parâmetro `checkoutEncounterParam` (TODO: confirmar na Cakto).

## Quiz gamificado
10 perguntas + 3 cartões de feedback (`src/lib/quiz.ts`: `QUESTIONS`, `FEEDBACKS`). XP, níveis (árvore que cresce) e conquistas. O resultado cita as respostas da pessoa.

## Depoimentos
`src/content/testimonials.ts`: `testimonials` (reais; vazio = seção oculta no site) e `sampleTestimonials` (modelos, só visíveis em `/?preview=depoimentos` ou em desenvolvimento, com etiqueta EXEMPLO).

## Notificações de prova social
`src/content/activity.ts` está vazio de propósito: só coloque fatos REAIS (ex.: dados do banco na Etapa 2). Números inventados são propaganda enganosa.

## Publicar
Defina `NEXT_PUBLIC_SITE_URL` (para o Open Graph) e, opcionalmente, `NEXT_PUBLIC_CF_BEACON_TOKEN`.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Vercel:** importe o repositório; o Next detecta o export estático.

## Links de teste
- `/?a=default`, `/?a=default&utm_source=tiktok` (os afiliados de exemplo estão inativos até terem checkout real), `/go?p=principal`
- `/quiz`, `/resultado`, `/encontro-1`, `/privacidade`, `/termos`

## Checklist (TODO)
- [ ] Checkouts reais da Cakto (default e afiliados) e nomes dos parâmetros
- [ ] Imagem do produto e revisão do hook
- [ ] Revisão jurídica de `/privacidade` e `/termos` (depois, `showLegalTodo: false`)
- [ ] Revisão teológica do Encontro 1
- [ ] Domínio + `NEXT_PUBLIC_SITE_URL`; token do Cloudflare Web Analytics
- [ ] WhatsApp real dos afiliados; nome definitivo do produto
- [ ] Garantia de 30 dias: prazo na Cakto + processo de comprovação + `/termos`
- [ ] Checkout avulso (R$ 19,90) e parâmetro do número do encontro
- [ ] Depoimentos: só reais, em `src/content/testimonials.ts`
