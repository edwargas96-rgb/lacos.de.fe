/** Lê "3,7,9" -> [3,7,9]. Só aceita encontros 2 a 30, sem repetidos, com no mínimo `min`. */
export function parseEncounters(raw: string | null, min: number): number[] | undefined {
  if (!raw) return undefined;
  const list = raw.split(',').map((x) => Number(x.trim()));
  if (list.some((n) => !Number.isInteger(n) || n < 2 || n > 30)) return undefined;
  const unique = [...new Set(list)].sort((a, b) => a - b);
  return unique.length >= min ? unique : undefined;
}
