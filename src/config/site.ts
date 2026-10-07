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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lacosdefe.vercel.app',

  /** Preço em reais (valor inteiro ou decimal). */
  price: 37.9,
  /**
   * Promoção "de/por". SÓ deixe ligada se o preço cheio for REAL (o valor que você vai cobrar depois
   * da promoção). Um "de" inventado é propaganda enganosa. Desligue com enabled: false.
   * Lembre de configurar o MESMO preço (37,90) no checkout da Cakto.
   */
  promo: {
    enabled: true,
    fullPrice: 79.9,
    label: 'Preço de lançamento',
  },
  /** Liga a compra de encontros à parte (/avulso). Desligada até existirem os checkouts avulsos na Cakto. */
  avulsoEnabled: false,

  /** Preço de cada encontro comprado à parte (a partir do Encontro 2). */
  priceSingle: 19.9,
  /** Mínimo de encontros na compra à parte (5 x 19,90 = 99,50, bem acima do pacote de 30). */
  avulsoMinimum: 5,
  /** Garantia incondicional (prazo legal de arrependimento). */
  guaranteeDays: 7,
  /** Garantia estendida: faz os 30 dias e a família não mudou nada, 100% de volta.
   *  TODO: configurar o mesmo prazo no produto da Cakto e definir como a pessoa comprova (ver README). */
  guarantee30Days: 30,

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
    width: 700,
    height: 1050,
  },

  /** Teste de preço A/B (só vale para afiliados com checkoutUrlB). */
  abTestEnabled: false,

  logo: { src: '/logo.webp', width: 720, height: 240 },

  /** Criadora do método (seção "Conheça a criadora" na landing). */
  founder: {
    name: 'Maria Almeida',
    photo: { src: '/maria.webp', width: 640, height: 1142, alt: 'Maria Almeida, criadora do Laços de Fé, sorrindo com a mão apoiada no rosto' },
  },

  /** Suporte e entrega (usados na página /obrigado). */
  support: {
    /** WhatsApp de suporte: só dígitos com DDI (ex.: 5511999999999). Vazio = botão oculto. TODO: preencher. */
    whatsapp: '5541989037815',
    /** Link de login da área de membros (Cakto Members). Vazio = botão oculto. TODO: preencher. */
    membersUrl: '',
  },

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
  /** Parâmetro do checkout que recebe o número do encontro avulso. Vazio = não enviar. TODO: confirmar na Cakto. */
  checkoutEncounterParam: 'encontro',

  /** Mostra avisos "TODO: revisão jurídica" em /privacidade e /termos. Desligue após revisar. */
  showLegalTodo: true,

  disclaimer:
    'Conteúdo devocional e educativo. Não substitui acompanhamento pastoral ou profissional. Cada família é única e os resultados variam.',
};

export function formatPrice(value: number = site.price): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
}
