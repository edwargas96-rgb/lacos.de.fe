import { describe, expect, it } from 'vitest';
import { computeResult, defaultVersion, isComplete, levelFor, QUESTIONS, readingTimeMs, STEPS } from './quiz';

const full = { fe: 'as-vezes', ultima: 'meses', criacao: 'afastei', filhos: 'ambas', telas: 'muito', reacao: 'reclama', desafio: 'medo', desejo: 'conversa', tempo: '15', horario: 'noite' };

describe('quiz', () => {
  it('valida respostas completas', () => {
    expect(isComplete(full)).toBe(true);
    expect(isComplete({ ...full, tempo: 'x' })).toBe(false);
    expect(isComplete(null)).toBe(false);
  });
  it('resultado vem da pergunta 3 e traz tempo e horário', () => {
    const r = computeResult(full);
    expect(r.title).toContain('perguntar vale mais que ensinar');
    expect(r.timeTip).toContain('15 minutos');
    expect(r.moment).toBe('à noite');
  });
  it('versão padrão do Encontro 1 vem da pergunta 2', () => {
    expect(defaultVersion({ ...full, filhos: 'mais' })).toBe('mais');
    expect(defaultVersion({ ...full, filhos: 'curta' })).toBe('curta');
    expect(defaultVersion(null)).toBe('curta');
  });
  it('intercala feedbacks e mantém todas as perguntas', () => {
    expect(STEPS.filter((s) => s.type === 'q')).toHaveLength(QUESTIONS.length);
    expect(STEPS.some((s) => s.type === 'fb')).toBe(true);
  });
  it('tempo de leitura tem piso e teto', () => {
    expect(readingTimeMs('curto')).toBe(4000);
    expect(readingTimeMs('palavra '.repeat(100))).toBe(10000);
  });
  it('níveis sobem com o XP e insights usam as respostas', () => {
    expect(levelFor(0).name).toBe('Semente');
    expect(levelFor(120).name).toBe('Árvore frondosa');
    expect(computeResult(full).insights.length).toBeGreaterThanOrEqual(3);
  });
});
