export interface Encontro {
  numero: number;
  titulo: string;
  passagem: string;
  historia: string[];
  perguntas: { curta: string[]; mais: string[] };
  atividade: { titulo: string; minutos: number; descricao: string; materiais: string };
  oracao: string;
  planoB: string;
  dicaPais: string;
}

// TODO: revisão teológica antes de publicar.
export const encontro1: Encontro = {
  numero: 1,
  titulo: 'Zaqueu e a árvore',
  passagem: 'Lucas 19.1-10 (recontada com palavras próprias)',
  historia: [
    'Zaqueu era um homem rico e baixinho que morava em Jericó. Cobrava impostos e muita gente não gostava dele, porque ele costumava cobrar mais do que devia.',
    'Um dia, soube que Jesus passaria pela cidade e quis muito vê-lo. Mas a rua estava cheia e, por ser baixinho, ele não enxergava nada. Então correu na frente e subiu numa árvore.',
    'Quando Jesus chegou ali, parou, olhou para cima e disse: "Zaqueu, desça depressa! Hoje eu quero ficar na sua casa." Zaqueu desceu cheio de alegria.',
    'As pessoas reclamaram: como Jesus iria à casa de um homem assim? Mas Zaqueu, tocado pela bondade de Jesus, decidiu mudar: prometeu devolver o que tinha tomado e dividir seus bens com os pobres.',
    'Jesus disse que, naquele dia, a salvação tinha chegado àquela casa, porque ele veio procurar quem estava perdido.',
  ],
  perguntas: {
    curta: [
      'Por que Zaqueu subiu na árvore?',
      'Como você acha que ele se sentiu quando Jesus chamou o nome dele?',
      'Se Jesus chamasse o seu nome hoje, o que você gostaria de contar a ele?',
    ],
    mais: [
      'As pessoas julgavam Zaqueu. Quando é mais fácil julgar alguém do que se aproximar dessa pessoa?',
      'O que você acha que fez Zaqueu mudar: uma bronca ou um convite? Por quê?',
      'Tem alguém que você evita? O que mudaria se você desse o primeiro passo?',
    ],
  },
  atividade: {
    titulo: 'Escada de nomes',
    minutos: 5,
    descricao:
      'Cada um escreve num papel o nome de alguém (família, escola, trabalho) que precisa de um gesto de carinho e escolhe um gesto pequeno para fazer amanhã.',
    materiais: 'Papel e caneta',
  },
  oracao:
    'Deus, obrigado porque o Senhor conhece o nome de cada um de nós. Ajuda nossa família a ser gentil com quem se sente sozinho. Amém.',
  planoB:
    'Comece pela atividade e deixe a história para depois; ou conte você mesmo a história em 1 minuto, com suas palavras. Se ele disser "hoje não", agradeça e convide de novo amanhã, sem bronca.',
  dicaPais: 'Ouça mais do que fale. Se a resposta for "não sei", aceite e siga em frente.',
};
