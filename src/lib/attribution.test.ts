import { describe, expect, it, vi } from 'vitest';
import type { Affiliate } from '../config/affiliates';
import {
  buildCheckoutUrl,
  captureAttribution,
  getVariant,
  readStored,
  type Attribution,
} from './attribution';
import type { KV } from './storage';

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_700_000_000_000;

function memStore(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
}

const affiliates: Record<string, Affiliate> = {
  default: { name: 'Meu', checkoutUrl: 'https://pay.test/default', active: true },
  ana: { name: 'Ana', checkoutUrl: 'https://pay.test/ana', checkoutUrlB: 'https://pay.test/ana-b', active: true },
  bia: { name: 'Bia', checkoutUrl: 'https://pay.test/bia', active: true },
  off: { name: 'Off', checkoutUrl: 'https://pay.test/off', active: false },
};

describe('captureAttribution', () => {
  it('grava slug válido com UTMs', () => {
    const s = memStore();
    const a = captureAttribution('?a=ana&utm_source=tiktok&utm_campaign=x', s, NOW, affiliates);
    expect(a).toEqual({ slug: 'ana', ts: NOW, utm: { utm_source: 'tiktok', utm_campaign: 'x' } });
    expect(readStored(s, NOW, affiliates)?.slug).toBe('ana');
  });

  it('ignora slug inválido (e inativo), avisa e cai no default', () => {
    const s = memStore();
    const warn = vi.fn();
    expect(captureAttribution('?a=naoexiste', s, NOW, affiliates, warn).slug).toBe('default');
    expect(captureAttribution('?a=off', s, NOW, affiliates, warn).slug).toBe('default');
    expect(warn).toHaveBeenCalledTimes(2);
    expect(s.data.size).toBe(0);
  });

  it('sem slug usa "default"', () => {
    const s = memStore();
    expect(captureAttribution('', s, NOW, affiliates).slug).toBe('default');
  });

  it('slug inválido não derruba afiliado válido já guardado', () => {
    const s = memStore();
    captureAttribution('?a=ana', s, NOW, affiliates);
    expect(captureAttribution('?a=lixo', s, NOW + DAY, affiliates, () => {}).slug).toBe('ana');
  });

  it('não sobrescreve afiliado válido dentro de 60 dias quando não há novo ?a=', () => {
    const s = memStore();
    captureAttribution('?a=ana&utm_source=a', s, NOW, affiliates);
    const later = captureAttribution('?utm_source=b', s, NOW + 30 * DAY, affiliates);
    expect(later.slug).toBe('ana');
    expect(readStored(s, NOW + 30 * DAY, affiliates)?.utm.utm_source).toBe('a');
  });

  it('um novo ?a= explícito sobrescreve', () => {
    const s = memStore();
    captureAttribution('?a=ana', s, NOW, affiliates);
    expect(captureAttribution('?a=bia', s, NOW + DAY, affiliates).slug).toBe('bia');
  });

  it('depois de 60 dias a atribuição expira', () => {
    const s = memStore();
    captureAttribution('?a=ana', s, NOW, affiliates);
    expect(readStored(s, NOW + 61 * DAY, affiliates)).toBeNull();
    expect(captureAttribution('', s, NOW + 61 * DAY, affiliates).slug).toBe('default');
  });
});

describe('buildCheckoutUrl', () => {
  const attr: Attribution = { slug: 'ana', ts: NOW, utm: { utm_source: 'tiktok', utm_campaign: 'c1' } };

  it('repassa os UTMs mapeados', () => {
    const url = new URL(buildCheckoutUrl(attr, affiliates.ana, 'A', { utm_source: 'src', utm_campaign: 'utm_campaign' }, ''));
    expect(url.origin + url.pathname).toBe('https://pay.test/ana');
    expect(url.searchParams.get('src')).toBe('tiktok');
    expect(url.searchParams.get('utm_campaign')).toBe('c1');
  });

  it('preserva query existente e envia o slug quando configurado', () => {
    const aff = { ...affiliates.bia, checkoutUrl: 'https://pay.test/bia?off=1' };
    const url = new URL(buildCheckoutUrl(attr, aff, 'A', { utm_source: 'utm_source' }, 'ref'));
    expect(url.searchParams.get('off')).toBe('1');
    expect(url.searchParams.get('ref')).toBe('ana');
  });

  it('usa checkoutUrlB na variante B', () => {
    expect(buildCheckoutUrl(attr, affiliates.ana, 'B', {}, '')).toBe('https://pay.test/ana-b');
  });
});

describe('getVariant (A/B)', () => {
  it('desligado: sempre A, sem gravar', () => {
    const s = memStore();
    expect(getVariant(affiliates.ana, s, false, () => 0.9)).toBe('A');
    expect(s.data.size).toBe(0);
  });

  it('ligado mas sem checkoutUrlB: A', () => {
    expect(getVariant(affiliates.bia, memStore(), true, () => 0.9)).toBe('A');
  });

  it('ligado: sorteia 50/50 uma vez e mantém', () => {
    const s = memStore();
    expect(getVariant(affiliates.ana, s, true, () => 0.7)).toBe('B');
    expect(getVariant(affiliates.ana, s, true, () => 0.1)).toBe('B');
    const s2 = memStore();
    expect(getVariant(affiliates.ana, s2, true, () => 0.2)).toBe('A');
  });
});
