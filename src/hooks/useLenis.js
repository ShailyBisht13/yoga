import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function useLenis(options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      ...options,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add('lenis');

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
}
