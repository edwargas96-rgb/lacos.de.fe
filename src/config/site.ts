/**
 * Configuração central do produto. Troque aqui nome, preço, hook e imagem.
 */
export const site = {
  /** Nome da marca (aparece na hero e no rodapé). */
  brand: 'Laços de Fé',
  /** TODO: nome provisório do produto — troque quando decidir. */
  productName: '30 Encontros em Família',
  description:
    '30 encontros de 15 minutos para abrir a Bíblia em família: uma história curta, três perguntas, uma atividade longe da tela e uma oração.',
  /** URL pública (para Open Graph). Defina NEXT_PUBLIC_SITE_URL no deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lacosdefe.example.com',

  /** Preço em reais (valor inteiro ou decimal). */
  price: 37,
  guaranteeDays: 7,

  /** Hook agressivo do topo da landing. Duas linhas: a segunda recebe destaque. */
  hook: {
    line1: 'O celular tem a atenção do seu filho todos os dias.',
    line2: 'A Bíblia, quando foi a última vez?',
  },

  /**
   * Imagem do produto na hero.
   * 1) Coloque o arquivo em /public (ex.: public/produto.png)
   * 2) Preencha src: '/produto.png' e ajuste width/height reais da imagem.
   * Enquanto src estiver vazio, aparece um espaço reservado.
   */
  productImage: {
    src: '/produto.webp',
    alt: 'Celular mostrando o app Laços de Fé: 30 encontros em família, com o caminho de 30 dias, 10 a 15 minutos por encontro e um novo encontro por dia',
    width: 1024,
    height: 1536,
  },

  /** Teste de preço A/B (só vale para afiliados com checkoutUrlB). */
  abTestEnabled: false,

  logo: { src: '/logo.webp', width: 2000, height: 667 },

  /** Janela first-touch da atribuição de afiliado. */
  attributionWindowDays: 60,

  /**
   * Repasse de parâmetros ao checkout. Chave = nome recebido na nossa URL,
   * valor = nome do parâmetro no checkout.
   * TODO: confirme na Cakto o nome exato dos parâmetros.
   */
  checkoutParamMap: {
    utm_source: 'utm_source',
    utm_medium: 'utm_medium',
    utm_campaign: 'utm_campaign',
    utm_content: 'utm_content',
    utm_term: 'utm_term',
  } as Record<string, string>,
  /** Parâmetro do checkout que recebe o slug do afiliado. Vazio = não enviar. TODO: confirmar na Cakto. */
  checkoutAffiliateParam: '',

  /** Mostra avisos "TODO: revisão jurídica" em /privacidade e /termos. Desligue após revisar. */
  showLegalTodo: true,

  disclaimer:
    'Conteúdo devocional e educativo. Não substitui acompanhamento pastoral ou profissional. Cada família é única e os resultados variam.',
};

export function formatPrice(value: number = site.price): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
}
