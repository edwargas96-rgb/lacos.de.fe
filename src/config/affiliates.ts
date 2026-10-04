export interface Affiliate {
  name: string;
  checkoutUrl: string;
  /** Checkout alternativo (preço B) para o teste A/B. */
  checkoutUrlB?: string;
  /** Checkout do encontro avulso. Sem ele, usa o do afiliado "default". */
  checkoutUrlAvulso?: string;
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
    // TODO: colocar o checkout real da Cakto
    checkoutUrl: 'https://pay.cakto.com.br/TODO-default',
    // TODO: checkout real do encontro avulso (R$ 19,90)
    checkoutUrlAvulso: 'https://pay.cakto.com.br/TODO-avulso',
    active: true,
  },
  exemplo1: {
    name: 'Exemplo Afiliado 1',
    // TODO: checkout real
    checkoutUrl: 'https://pay.cakto.com.br/TODO-exemplo1',
    checkoutUrlB: 'https://pay.cakto.com.br/TODO-exemplo1-b',
    whatsapp: '5500000000000', // TODO: número real
    active: true,
  },
  exemplo2: {
    name: 'Exemplo Afiliado 2',
    // TODO: checkout real
    checkoutUrl: 'https://pay.cakto.com.br/TODO-exemplo2',
    active: true,
  },
};
