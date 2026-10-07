import { describe, expect, it } from 'vitest';
import { isUnlocked, unlock } from './unlock';
import type { KV } from './storage';

function mem(): KV {
  const d = new Map<string, string>();
  return { getItem: (k) => d.get(k) ?? null, setItem: (k, v) => void d.set(k, v) };
}

describe('unlock do cupom', () => {
  it('começa bloqueado', () => expect(isUnlocked(mem())).toBe(false));
  it('libera pelo quiz ou pelo Encontro 1 e guarda só o primeiro', () => {
    const s = mem();
    expect(unlock('quiz', s)).toBe(true);
    expect(isUnlocked(s)).toBe(true);
    expect(unlock('encontro1', s)).toBe(false);
  });
  it('sem storage não libera', () => {
    expect(isUnlocked(null)).toBe(false);
    expect(unlock('quiz', null)).toBe(true);
  });
});
