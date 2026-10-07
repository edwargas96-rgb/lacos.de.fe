export interface Affiliate {
  name: string;
  checkoutUrl: string;
  /** Checkout alternativo (preço B) para o teste A/B. */
  checkoutUrlB?: string;
  /** Checkout do encontro avulso. Sem ele, usa o do afiliado "default". */
  checkoutUrlAvulso?: string;
  /** Checkout da oferta Essencial (10 encontros). Sem ele, usa o do afiliado "default". */
  checkoutUrlEssencial?: string;
  /**
   * Checkout por quantidade de encontros (2, 3, 4…), cada um com o preço = quantidade x R$ 19,90.
   * Sem a quantidade aqui, usa checkoutUrlAvulso. TODO: criar as ofertas na Cakto.
   */
  checkoutUrlAvulsoByQty?: Record<number, string>;
  /** Só dígitos com DDI, ex.: 5511999999999. */
  whatsapp?: string;
  active: boolean;
}

export const DEFAULT_SLUG = 'default';

/**
 * Mapa slug -> afiliado. Para adicionar um, crie uma nova chave aqui.
 * Link do afiliado: https://seudominio.com/?a=slug
 */
export const AFFILIATES: Record<string, Affiliate> = {
  default: {
    name: 'Meu link',
    checkoutUrl: 'https://pay.cakto.com.br/34vsp2i_1172299',
    // TODO: checkout real do encontro avulso (R$ 19,90)
    checkoutUrlAvulso: 'https://pay.cakto.com.br/TODO-avulso',
    // TODO: checkout real da oferta Essencial (10 encontros, R$ 29,90)
    checkoutUrlEssencial: 'https://pay.cakto.com.br/TODO-essencial',
    active: true,
  },
  exemplo1: {
    name: 'Exemplo Afiliado 1',
    // TODO: checkout real
    checkoutUrl: 'https://pay.cakto.com.br/TODO-exemplo1',
    checkoutUrlB: 'https://pay.cakto.com.br/TODO-exemplo1-b',
    whatsapp: '5500000000000', // TODO: número real
    active: false, // TODO: ative quando tiver o checkout real
  },
  exemplo2: {
    name: 'Exemplo Afiliado 2',
    // TODO: checkout real
    checkoutUrl: 'https://pay.cakto.com.br/TODO-exemplo2',
    active: false, // TODO: ative quando tiver o checkout real
  },
};
