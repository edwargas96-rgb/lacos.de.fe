import { getAttribution } from './attribution';
import { AFFILIATES } from '../config/affiliates';
import { getVariant } from './attribution';
import { getStorage } from './storage';

export type TrackEvent =
  | 'view_landing'
  | 'quiz_start'
  | 'quiz_complete'
  | 'view_resultado'
  | 'view_encontro1'
  | 'encontro1_done'
  | 'checkout_click'
  | 'avulso_upsell';

export interface TrackPayload {
  event: TrackEvent;
  affiliate: string;
  ab: 'A' | 'B';
  ts: number;
  [key: string]: unknown;
}

type Sink = (payload: TrackPayload) => void;
const sinks: Sink[] = [];

/** Ponto de extensão: na próxima etapa, registre aqui o envio ao Supabase. */
export function registerSink(sink: Sink): void {
  sinks.push(sink);
}

/** Carrega o Cloudflare Web Analytics (só em produção e com o token definido). */
export function initAnalytics(): void {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (process.env.NODE_ENV !== 'production' || !token || typeof document === 'undefined') return;
  if (document.querySelector('script[data-cf-beacon]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(s);
}

export function track(event: TrackEvent, data: Record<string, unknown> = {}): void {
  const store = getStorage();
  const attr = getAttribution(store);
  const affiliate = AFFILIATES[attr.slug] ?? AFFILIATES.default;
  const payload: TrackPayload = { ...data, event, affiliate: attr.slug, ab: getVariant(affiliate, store), ts: Date.now() };
  if (process.env.NODE_ENV !== 'production') console.log('[track]', payload);
  sinks.forEach((sink) => {
    try {
      sink(payload);
    } catch {
      /* um sink com erro não pode quebrar a página */
    }
  });
}
