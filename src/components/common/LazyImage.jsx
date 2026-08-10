/**
 * LazyImage — Lazy-loading image with blur-up placeholder.
 *
 * Features:
 *   - Native loading="lazy" + decoding="async"
 *   - Blur-up placeholder until loaded
 *   - Fade-in on load via Framer Motion
 *   - Reduces layout shift with explicit dimensions
 *   - Accessible: alt text, role
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export default function LazyImage({
  src,
  alt = '',
  className,
  imgClassName,
  width,
  height,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={width && height ? { width, height } : undefined}
    >
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-border" aria-hidden="true" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn('relative h-full w-full object-cover', imgClassName)}
        {...props}
      />
    </div>
  );
}