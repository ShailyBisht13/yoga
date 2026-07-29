import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Fade elements in on scroll using GSAP ScrollTrigger.
 */
export function fadeInOnScroll(selector, options = {}) {
  const {
    y = 40,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 85%',
    once = true,
  } = options;

  return gsap.from(selector, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start,
      once,
    },
  });
}

/**
 * Parallax effect for hero images.
 */
export function parallax(element, speed = 0.3) {
  if (!element) return null;

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
