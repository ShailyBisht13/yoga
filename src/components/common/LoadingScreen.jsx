/**
 * LoadingScreen — Luxury loading screen with logo animation.
 *
 * Features:
 *   - Full-screen overlay with brand background
 *   - Logo scale + fade-in animation
 *   - Elegant loading bar
 *   - Fades out after page load
 *   - Accessible: aria-hidden when hidden, role="status"
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Page is loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo with scale + fade animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <motion.img
              src="/logo png2.png"
              alt="Vimoksha Yogshala"
              className="h-48 w-auto object-contain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            {/* Elegant loading bar */}
            <div className="relative h-0.5 w-40 overflow-hidden rounded-full bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}