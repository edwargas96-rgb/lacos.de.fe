export interface Affiliate {
  name: string;
  checkoutUrl: string;
  /** Checkout alternativo (preço B) para o teste A/B. */
  checkoutUrlB?: string;
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
