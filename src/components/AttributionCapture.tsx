'use client';
import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';
import { getStorage } from '@/lib/storage';
import { initAnalytics } from '@/lib/track';

/** Roda em toda página: grava a atribuição de afiliado e liga a medição. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution(window.location.search, getStorage());
    initAnalytics();
  }, []);
  return null;
}
