'use client';
import { useEffect } from 'react';
import { track, type TrackEvent } from '@/lib/track';

export default function TrackView({ event }: { event: TrackEvent }) {
  useEffect(() => {
    // Aguarda a captura de atribuição (efeito do layout) antes de medir.
    const t = setTimeout(() => track(event), 0);
    return () => clearTimeout(t);
  }, [event]);
  return null;
}
