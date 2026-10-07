import { readJSON, writeJSON, type KV } from './storage';

export const UNLOCK_KEY = 'lf_unlock';
export type UnlockVia = 'quiz' | 'encontro1';
interface Unlock { via: UnlockVia; ts: number }

/** Marca que a pessoa completou o quiz ou o Encontro 1 (libera o cupom). Mantém o primeiro registro. */
export function unlock(via: UnlockVia, store: KV | null, now: number = Date.now()): boolean {
  if (isUnlocked(store)) return false;
  writeJSON(store, UNLOCK_KEY, { via, ts: now } satisfies Unlock);
  return true;
}

export function isUnlocked(store: KV | null): boolean {
  const u = readJSON<Unlock>(store, UNLOCK_KEY);
  return !!u && (u.via === 'quiz' || u.via === 'encontro1');
}
