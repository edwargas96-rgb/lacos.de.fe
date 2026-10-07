'use client';
import { useEffect, useState } from 'react';
import { getStorage } from './storage';
import { isUnlocked } from './unlock';

/** false no servidor e no primeiro render; vira true depois de ler o localStorage. */
export function useUnlocked(): boolean {
  const [u, setU] = useState(false);
  useEffect(() => {
    setU(isUnlocked(getStorage()));
  }, []);
  return u;
}
