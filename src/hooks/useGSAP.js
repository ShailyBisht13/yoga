import { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsapAnimations';

export default function useGSAP(callback, dependencies = []) {
  const contextRef = useRef(null);

  useEffect(() => {
    contextRef.current = gsap.context(callback);
    return () => contextRef.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
