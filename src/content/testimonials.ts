export interface Testimonial {
  name: string;
  /** Print da conversa (opcional), em /public. Cubra telefone, sobrenome e fotos ANTES de salvar. */
  image?: { src: string; width: number; height: number; alt: string };
  /** Ex.: "Mãe de dois, Curitiba". Só informe o que a pessoa autorizou. */
  detail?: string;
  /** Texto do depoimento (sempre preencha: serve de legenda e de texto alternativo). */
  text: string;
}

/**
 * Depoimentos REAIS, com autorização de quem falou. Vazio = a seção não aparece no site.
 * Quando começarem as vendas, cole os reais aqui.
 */
export const testimonials: Testimonial[] = [];

/**
 * MODELOS para você ver o design. NÃO são pessoas reais e NUNCA aparecem no site público:
 * só aparecem em desenvolvimento ou abrindo /?preview=depoimentos (com a etiqueta "EXEMPLO").
 */
export const sampleTestimonials: Testimonial[] = [
  { name: 'Nome da mãe', detail: 'Mãe de dois, cidade', text: 'Eu não sabia por onde começar. Ter a história, as perguntas e a oração prontas tirou o peso de cima de mim.' },
  { name: 'Nome do pai', detail: 'Pai, cidade', text: 'Foram só 15 minutos, mas a gente sentou junto, sem celular, e conversou de um jeito que não conversava antes.' },
  { name: 'Nome da avó', detail: 'Avó, cidade', text: 'O Plano B me ajudou nos dias em que ele não queria. Aprendi a convidar em vez de exigir.' },
];
