/**
 * FloatingActions — Premium floating buttons for WhatsApp, Call, and Scroll-to-Top.
 *
 * Features:
 *   - WhatsApp button (bottom-right, green, pulse animation)
 *   - Call button (bottom-right, above WhatsApp)
 *   - Scroll-to-Top button (appears after scrolling, smooth animation)
 *   - Framer Motion: scale/opacity transitions, hover effects
 *   - Accessible: ARIA labels, keyboard focusable
 */

import { useState, useEffect, useCallback } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlinePhone, HiArrowUp } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { contactInfo } from '@/utils/constants';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4"
      aria-label="Quick actions"
    >
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-dark shadow-elevated transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <HiArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Button */}
      <motion.a
        href={contactInfo.phoneHref}
        aria-label={`Call us at ${contactInfo.phone}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-elevated transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <HiOutlinePhone className="text-xl" />
      </motion.a>

      {/* WhatsApp Button with pulse */}
      <motion.a
        href={contactInfo.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <FaWhatsapp className="relative text-xl" />
      </motion.a>
    </div>
  );
}