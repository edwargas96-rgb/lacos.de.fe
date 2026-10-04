export interface Option {
  id: string;
  label: string;
}
export interface Question {
  id: string;
  title: string;
  options: Option[];
}

/** 10 perguntas. A barra de progresso usa QUESTIONS.length. */
export const QUESTIONS: Question[] = [
  {
    id: 'fe',
    title: 'Como é a fé em casa hoje?',
    options: [
      { id: 'quase-nao', label: 'Quase não falamos' },
      { id: 'so-igreja', label: 'Só na igreja' },
      { id: 'nao-deu-certo', label: 'Já tentamos e não deu certo' },
      { id: 'as-vezes', label: 'Tentamos às vezes' },
    ],
  },
  {
    id: 'ultima',
    title: 'Quando foi a última vez que a família abriu a Bíblia junta?',
    options: [
      { id: 'semana', label: 'Nesta semana' },
      { id: 'mes', label: 'Neste mês' },
      { id: 'meses', label: 'Faz meses' },
      { id: 'nunca', label: 'Nunca fizemos' },
    ],
  },
  {
    id: 'criacao',
    title: 'Como foi a sua própria criação na fé?',
    options: [
      { id: 'igreja', label: 'Cresci na igreja' },
      { id: 'datas', label: 'Só em datas especiais' },
      { id: 'pouca', label: 'Tive pouco contato' },
      { id: 'afastei', label: 'Me afastei por um tempo' },
    ],
  },
  {
    id: 'filhos',
    title: 'Qual frase descreve seus filhos?',
    options: [
      { id: 'curta', label: 'Ainda pedem historinha' },
      { id: 'mais', label: 'Já têm opinião própria e vivem no celular' },
      { id: 'ambas', label: 'Tenho idades diferentes' },
    ],
  },
  {
    id: 'telas',
    title: 'Quanto tempo seu filho passa em telas num dia comum?',
    options: [
      { id: 'pouco', label: 'Menos de 1 hora' },
      { id: 'medio', label: 'De 1 a 2 horas' },
      { id: 'muito', label: '3 horas ou mais' },
      { id: 'nao-sei', label: 'Não sei dizer' },
    ],
  },
  {
    id: 'reacao',
    title: 'Quando você propõe algo em família, como ele costuma reagir?',
    options: [
      { id: 'topa', label: 'Topa na hora' },
      { id: 'humor', label: 'Depende do humor' },
      { id: 'reclama', label: 'Reclama' },
      { id: 'ignora', label: 'Finge que não ouviu' },
    ],
  },
  {
    id: 'desafio',
    title: 'Qual é o seu maior desafio?',
    options: [
      { id: 'comecar', label: 'Não sei por onde começar' },
      { id: 'nao-quer', label: 'Ele não quer participar' },
      { id: 'tempo', label: 'Falta tempo' },
      { id: 'medo', label: 'Tenho medo de não saber responder' },
    ],
  },
  {
    id: 'desejo',
    title: 'O que você mais gostaria de ver na sua casa?',
    options: [
      { id: 'conversa', label: 'Mais conversa' },
      { id: 'paz', label: 'Mais paz' },
      { id: 'presenca', label: 'Mais presença uns dos outros' },
      { id: 'fe-viva', label: 'Fé no dia a dia' },
    ],
  },
  {
    id: 'tempo',
    title: 'Quanto tempo cabe por dia?',
    options: [
      { id: '10', label: '10 min' },
      { id: '15', label: '15 min' },
      { id: '20', label: '20 min ou mais' },
    ],
  },
  {
    id: 'horario',
    title: 'Qual o melhor horário?',
    options: [
      { id: 'manha', label: 'Manhã' },
      { id: 'noite', label: 'Noite' },
      { id: 'fim-de-semana', label: 'Fim de semana' },
    ],
  },
];

/** Cartões de feedback exibidos entre as perguntas (depois da pergunta `after`). */
export interface Feedback {
  id: string;
  after: string;
  title: string;
  badge: string;
  text: (a: Answers) => string;
}

export const FEEDBACKS: Feedback[] = [
  {
    id: 'fb1',
    after: 'criacao',
    title: 'Sua história importa',
    badge: 'Coração aberto',
    text: () =>
      'O jeito como você foi criado(a) explica de onde você parte, não até onde você pode chegar. Muitas famílias começam do zero e constroem o hábito aos poucos, um encontro de cada vez.',
  },
  {
    id: 'fb2',
    after: 'reacao',
    title: 'Convite funciona melhor que cobrança',
    badge: 'Olhar atento',
    text: (a) =>
      (a.telas === 'muito' || a.telas === 'medio'
        ? 'O celular é parte da rotina da sua casa, e tudo bem: aqui ele vira o guia dos pais, não o brinquedo da criança. '
        : '') +
      'No Laços de Fé, cada encontro começa por um convite, e existe um Plano B para os dias em que ele não quer participar.',
  },
  {
    id: 'fb3',
    after: 'desejo',
    title: 'Você já sabe o que quer',
    badge: 'Propósito claro',
    text: (a) =>
      `Querer ${DESEJO_LABEL[a.desejo] ?? 'mais da sua família'} já é metade do caminho. Faltam só dois passos: o tempo que cabe na sua rotina e o melhor horário.`,
  },
];

const DESEJO_LABEL: Record<string, string> = {
  conversa: 'mais conversa em casa',
  paz: 'mais paz em casa',
  presenca: 'mais presença uns dos outros',
  'fe-viva': 'a fé no dia a dia',
};

export type Step =
  | { type: 'q'; question: Question }
  | { type: 'fb'; feedback: Feedback };

/** Sequência completa: perguntas com feedbacks intercalados. */
export const STEPS: Step[] = QUESTIONS.flatMap((question) => {
  const steps: Step[] = [{ type: 'q', question }];
  FEEDBACKS.filter((f) => f.after === question.id).forEach((feedback) => steps.push({ type: 'fb', feedback }));
  return steps;
});

/** Tempo de leitura de um feedback (ms), com piso confortável. */
export function readingTimeMs(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.min(10000, Math.max(4000, 2500 + words * 220));
}

export const XP_PER_ANSWER = 10;
export const XP_PER_FEEDBACK = 5;

export const LEVELS = [
  { min: 0, name: 'Semente' },
  { min: 30, name: 'Broto' },
  { min: 60, name: 'Muda' },
  { min: 90, name: 'Árvore jovem' },
  { min: 120, name: 'Árvore frondosa' },
];

export function levelFor(xp: number): { index: number; name: string } {
  let index = 0;
  LEVELS.forEach((l, i) => {
    if (xp >= l.min) index = i;
  });
  return { index, name: LEVELS[index].name };
}

export function xpFor(answeredCount: number, feedbacksSeen: number): number {
  return answeredCount * XP_PER_ANSWER + feedbacksSeen * XP_PER_FEEDBACK;
}

export type Answers = Record<string, string>;
export const ANSWERS_KEY = 'lf_quiz';

export function isComplete(answers: Answers | null): answers is Answers {
  return !!answers && QUESTIONS.every((q) => q.options.some((o) => o.id === answers[q.id]));
}

export interface QuizResult {
  title: string;
  tip: string;
}

const RESULTS: Record<string, QuizResult> = {
  comecar: {
    title: 'Seu ponto de partida: um passo pequeno, sem pressão',
    tip: 'Escolha um horário fixo de 10 minutos, leia uma história curta e faça uma só pergunta: "o que você achou mais interessante?".',
  },
  'nao-quer': {
    title: 'Seu ponto de partida: convidar em vez de exigir',
    tip: 'Comece pela atividade, não pela leitura. Convide ("quer me ajudar com uma coisa?") e aceite um "hoje não" sem bronca.',
  },
  tempo: {
    title: 'Seu ponto de partida: 10 minutos que cabem na rotina',
    tip: 'Encaixe no que já existe (jantar ou antes de dormir). Dez minutos constantes valem mais que uma hora rara.',
  },
  medo: {
    title: 'Seu ponto de partida: perguntar vale mais que ensinar',
    tip: 'Você não precisa saber tudo. "Boa pergunta, vamos descobrir juntos" é ótima resposta e abre conversa.',
  },
};

const TIME_LABEL: Record<string, string> = { '10': '10 minutos', '15': '15 minutos', '20': '20 minutos ou mais' };
const MOMENT_LABEL: Record<string, string> = { manha: 'de manhã', noite: 'à noite', 'fim-de-semana': 'no fim de semana' };

export function buildInsights(a: Answers): string[] {
  const out: string[] = [];
  if (a.ultima === 'meses' || a.ultima === 'nunca') {
    out.push('Vocês estão começando, e tudo bem. O Encontro 1 foi pensado para quem começa do zero, sem precisar saber nada.');
  } else {
    out.push('Vocês já deram passos. O Laços de Fé ajuda a transformar tentativas soltas em um hábito simples.');
  }
  if (a.telas === 'muito' || a.telas === 'medio') {
    out.push('As telas fazem parte da rotina. Aqui o celular é o guia dos pais, e a atividade de cada encontro é longe da tela.');
  }
  if (a.reacao === 'reclama' || a.reacao === 'ignora' || a.reacao === 'humor') {
    out.push('Como ele nem sempre topa, cada encontro tem um Plano B: começar pela atividade, contar a história com suas palavras ou deixar para amanhã, sem bronca.');
  }
  if (a.desejo && DESEJO_LABEL[a.desejo]) {
    out.push(`Você quer ${DESEJO_LABEL[a.desejo]}: as três perguntas de cada encontro foram feitas para abrir exatamente esse tipo de conversa.`);
  }
  return out;
}

export function computeResult(answers: Answers) {
  const base = RESULTS[answers.desafio] ?? RESULTS.comecar;
  const time = TIME_LABEL[answers.tempo];
  return {
    insights: buildInsights(answers),
    title: base.title,
    tip: base.tip,
    timeTip: time ? `Você disse que cabem ${time} por dia: é o suficiente para um encontro.` : '',
    moment: MOMENT_LABEL[answers.horario] ?? '',
  };
}

export type EncounterVersion = 'curta' | 'mais';

/** Versão padrão do Encontro 1 (resposta 2). "Ambas" começa na curta e destaca a alternância. */
export function defaultVersion(answers: Answers | null): EncounterVersion {
  return answers?.filhos === 'mais' ? 'mais' : 'curta';
}
