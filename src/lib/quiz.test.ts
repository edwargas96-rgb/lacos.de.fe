import { describe, expect, it } from 'vitest';
import { computeResult, defaultVersion, isComplete } from './quiz';

const full = { fe: 'as-vezes', filhos: 'ambas', desafio: 'medo', tempo: '15', horario: 'noite' };

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
});
