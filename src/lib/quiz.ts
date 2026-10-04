export interface Option {
  id: string;
  label: string;
}
export interface Question {
  id: string;
  title: string;
  options: Option[];
}

/** 5 perguntas. A barra de progresso usa QUESTIONS.length. */
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
    id: 'filhos',
    title: 'Qual frase descreve seus filhos?',
    options: [
      { id: 'curta', label: 'Ainda pedem historinha' },
      { id: 'mais', label: 'Já têm opinião própria e vivem no celular' },
      { id: 'ambas', label: 'Tenho idades diferentes' },
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

export function computeResult(answers: Answers) {
  const base = RESULTS[answers.desafio] ?? RESULTS.comecar;
  const time = TIME_LABEL[answers.tempo];
  return {
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
