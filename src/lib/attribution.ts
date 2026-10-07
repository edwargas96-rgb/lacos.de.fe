import { AFFILIATES, DEFAULT_SLUG, type Affiliate } from '../config/affiliates';
import { site } from '../config/site';
import { readJSON, writeJSON, type KV } from './storage';

export const ATTR_KEY = 'lf_attr';
export const AB_KEY = 'lf_ab';
const DAY_MS = 24 * 60 * 60 * 1000;

export interface Attribution {
  slug: string;
  ts: number;
  utm: Record<string, string>;
}
export type Variant = 'A' | 'B';
type Affiliates = Record<string, Affiliate>;

function isValidSlug(slug: string | null | undefined, affiliates: Affiliates): slug is string {
  return !!slug && Object.prototype.hasOwnProperty.call(affiliates, slug) && affiliates[slug].active;
}

function extractUtm(params: URLSearchParams): Record<string, string> {
  const utm: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith('utm_') && value) utm[key] = value;
  });
  return utm;
}

/** Atribuição guardada, se ainda válida (dentro da janela e com afiliado ativo). */
export function readStored(
  store: KV | null,
  now: number = Date.now(),
  affiliates: Affiliates = AFFILIATES,
  windowDays: number = site.attributionWindowDays,
): Attribution | null {
  const a = readJSON<Attribution>(store, ATTR_KEY);
  if (!a || typeof a.ts !== 'number' || !isValidSlug(a.slug, affiliates)) return null;
  if (now - a.ts > windowDays * DAY_MS) return null;
  return a;
}

/**
 * Chamada em toda página. Regras:
 * - ?a=slug válido e ativo: grava (um novo ?a= explícito sempre vale).
 * - ?a= inválido: ignora e avisa no console.
 * - sem ?a=: mantém o afiliado guardado (first-touch por 60 dias); sem nada guardado, vale "default".
 */
export function captureAttribution(
  search: string,
  store: KV | null,
  now: number = Date.now(),
  affiliates: Affiliates = AFFILIATES,
  warn: (msg: string) => void = (m) => console.warn(m),
): Attribution {
  const params = new URLSearchParams(search);
  const slug = params.get('a');
  const utm = extractUtm(params);
  const stored = readStored(store, now, affiliates);

  if (slug !== null && slug !== '') {
    if (isValidSlug(slug, affiliates)) {
      const attr: Attribution = { slug, ts: now, utm };
      writeJSON(store, ATTR_KEY, attr);
      return attr;
    }
    warn(`[afiliado] slug inválido ou inativo ignorado: "${slug}"`);
  }

  if (stored) return stored;

  const fallback: Attribution = { slug: DEFAULT_SLUG, ts: now, utm };
  if (Object.keys(utm).length > 0) writeJSON(store, ATTR_KEY, fallback);
  return fallback;
}

/** Lê a atribuição atual sem alterá-la. */
export function getAttribution(
  store: KV | null,
  now: number = Date.now(),
  affiliates: Affiliates = AFFILIATES,
): Attribution {
  return readStored(store, now, affiliates) ?? { slug: DEFAULT_SLUG, ts: now, utm: {} };
}

/** Sorteia A/B 50/50 uma única vez (se ligado e o afiliado tiver checkoutUrlB). */
export function getVariant(
  affiliate: Affiliate,
  store: KV | null,
  enabled: boolean = site.abTestEnabled,
  rng: () => number = Math.random,
): Variant {
  if (!enabled || !affiliate.checkoutUrlB) return 'A';
  const saved = store?.getItem(AB_KEY);
  if (saved === 'A' || saved === 'B') return saved;
  const v: Variant = rng() < 0.5 ? 'A' : 'B';
  try {
    store?.setItem(AB_KEY, v);
  } catch {
    /* ignora */
  }
  return v;
}

export type Product = 'principal' | 'avulso' | 'essencial';

/** Monta a URL do checkout repassando os parâmetros configurados em site.ts. */
export function buildCheckoutUrl(
  attr: Attribution,
  affiliate: Affiliate,
  variant: Variant,
  paramMap: Record<string, string> = site.checkoutParamMap,
  affiliateParam: string = site.checkoutAffiliateParam,
  product: Product = 'principal',
  encounter?: number | number[],
  encounterParam: string = site.checkoutEncounterParam,
  fallback: Affiliate | undefined = AFFILIATES[DEFAULT_SLUG],
  coupon?: { code: string; param: string },
): string {
  let base: string;
  if (product === 'essencial') {
    const url = affiliate.checkoutUrlEssencial ?? fallback?.checkoutUrlEssencial;
    if (!url) throw new Error('checkout do Essencial não configurado');
    base = url;
  } else if (product === 'avulso') {
    const qty = Array.isArray(encounter) ? encounter.length : encounter ? 1 : 0;
    base =
      affiliate.checkoutUrlAvulsoByQty?.[qty] ??
      fallback?.checkoutUrlAvulsoByQty?.[qty] ??
      affiliate.checkoutUrlAvulso ??
      fallback?.checkoutUrlAvulso ??
      affiliate.checkoutUrl;
  } else {
    base = variant === 'B' && affiliate.checkoutUrlB ? affiliate.checkoutUrlB : affiliate.checkoutUrl;
  }
  const url = new URL(base);
  for (const [from, to] of Object.entries(paramMap)) {
    const value = attr.utm[from];
    if (value) url.searchParams.set(to, value);
  }
  if (affiliateParam) url.searchParams.set(affiliateParam, attr.slug);
  const list = Array.isArray(encounter) ? encounter : encounter ? [encounter] : [];
  if (product === 'avulso' && list.length > 0 && encounterParam) url.searchParams.set(encounterParam, list.join(','));
  if (product === 'principal' && coupon?.code && coupon.param) url.searchParams.set(coupon.param, coupon.code);
  return url.toString();
}
