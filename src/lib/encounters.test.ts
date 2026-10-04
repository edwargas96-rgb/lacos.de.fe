import { describe, expect, it } from 'vitest';
import { parseEncounters } from './encounters';

describe('parseEncounters', () => {
  it('aceita lista válida, ordena e remove repetidos', () => {
    expect(parseEncounters('9,3,3,7', 2)).toEqual([3, 7, 9]);
  });
  it('exige o mínimo de encontros', () => {
    expect(parseEncounters('5', 2)).toBeUndefined();
    expect(parseEncounters('5,5', 2)).toBeUndefined();
  });
  it('rejeita fora de 2 a 30, lixo e vazio', () => {
    expect(parseEncounters('1,5', 2)).toBeUndefined();
    expect(parseEncounters('5,31', 2)).toBeUndefined();
    expect(parseEncounters('a,b', 2)).toBeUndefined();
    expect(parseEncounters(null, 2)).toBeUndefined();
  });
});
