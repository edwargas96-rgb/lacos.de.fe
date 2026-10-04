export interface KV {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** localStorage seguro: devolve null no servidor ou quando o navegador bloqueia. */
export function getStorage(): KV | null {
  try {
    if (typeof window === 'undefined') return null;
    const s = window.localStorage;
    s.getItem('__t');
    return s;
  } catch {
    return null;
  }
}

export function readJSON<T>(store: KV | null, key: string): T | null {
  try {
    const raw = store?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON(store: KV | null, key: string, value: unknown): void {
  try {
    store?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage cheio ou bloqueado: seguimos sem persistir */
  }
}
