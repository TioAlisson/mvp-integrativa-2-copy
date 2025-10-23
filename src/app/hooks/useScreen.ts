'use client'

import { useEffect, useState } from 'react';

export default function useScreen(
  breakpoint: number,
  operator: 'min' | 'max' = 'max'
): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setMatches(operator === 'max' ? width < breakpoint : width >= breakpoint);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [breakpoint, operator]);

  return matches;
}
