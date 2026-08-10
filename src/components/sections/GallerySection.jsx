/**
 * GallerySection — Premium gallery with true masonry layout, animated filters,
 * blur-up image loading, and a swipeable lightbox with thumbnail strip.
 *
 * Images live in `src/assets/images/gallery/`. gallery4 is a .webp file —
 * keep that extension, don't rename it to .jpg.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/* ===== Gallery images ===== */
import gallery1 from '@/assets/images/gallery/gallery1.jpg';
import gallery2 from '@/assets/images/gallery/gallery2.jpg';
import gallery3 from '@/assets/images/gallery/gallery3.jpg';
import gallery4 from '@/assets/images/gallery/gallery10.webp';
import gallery5 from '@/assets/images/gallery/gallery5.jpg';
import gallery6 from '@/assets/images/gallery/gallery6.jpg';
import gallery7 from '@/assets/images/gallery/gallery7.jpg';
import gallery8 from '@/assets/images/gallery/gallery8.jpg';
import gallery9 from '@/assets/images/gallery/gallery9.jpg';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

/* Lightbox slide variants — direction-aware */
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.96 }),
};

/* ===== Filter categories ===== */
const categories = [
  'All',
  'Yoga Classes',
  'Meditation',
  'Teacher Training',
  'Events',
  'Workshops',
];

/* ===== Gallery data ===== */
const galleryItems = [
  { id: 1, image: gallery1, category: 'Yoga Classes', title: 'Hatha Yoga Session', height: 'h-[320px]' },
  { id: 2, image: gallery2, category: 'Meditation', title: 'Morning Meditation', height: 'h-[420px]' },
  { id: 3, image: gallery3, category: 'Teacher Training', title: 'Teacher Training Program', height: 'h-[280px]' },
  { id: 4, image: gallery4, category: 'Events', title: 'Yoga Retreat Event', height: 'h-[380px]' },
  { id: 5, image: gallery5, category: 'Workshops', title: 'Pranayama Workshop', height: 'h-[300px]' },
  { id: 6, image: gallery6, category: 'Yoga Classes', title: 'Ashtanga Practice', height: 'h-[440px]' },
  { id: 7, image: gallery7, category: 'Meditation', title: 'Sunset Meditation', height: 'h-[280px]' },
  { id: 8, image: gallery8, category: 'Teacher Training', title: 'Alignment Training', height: 'h-[360px]' },
  { id: 9, image: gallery9, category: 'Events', title: 'Community Yoga Day', height: 'h-[400px]' },
];

/* ===== Placeholder gradient colors ===== */
const gradients = [
  'from-primary/30 to-primary-dark/40',
  'from-secondary/30 to-secondary-light/40',
  'from-primary-light/30 to-primary/40',
  'from-secondary-light/30 to-secondary/40',
  'from-primary-dark/30 to-primary-light/40',
  'from-primary/30 to-secondary/40',
  'from-secondary/30 to-primary-light/40',
  'from-primary-light/30 to-secondary-light/40',
  'from-primary-dark/30 to-secondary/40',
];

/* ===== Category counts, memoized once ===== */
const categoryCounts = categories.reduce((acc, cat) => {
  acc[cat] = cat === 'All' ? galleryItems.length : galleryItems.filter((i) => i.category === cat).length;
  return acc;
}, {});

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [loadedIds, setLoadedIds] = useState(() => new Set());
  const [hoveredId, setHoveredId] = useState(null);

  /* Filtered items based on active category */
  const filteredItems = useMemo(
    () =>
      activeFilter === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const markLoaded = useCallback((id) => {
    setLoadedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  /* ===== Lightbox navigation ===== */
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setDirection(1);
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [filteredItems.length]);

  const goToImage = useCallback(
    (index) => {
      setDirection(index > (lightboxIndex ?? 0) ? 1 : -1);
      setLightboxIndex(index);
    },
    [lightboxIndex],
  );

  /* ===== Keyboard navigation ===== */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const dragThreshold = 80;

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#FAF7F2] py-[120px]"
    >
      {/* Ambient decorative glow, quiet and out of the way */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-secondary/5 blur-3xl"
      />

      <Container className="relative max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-12 flex max-w-[700px] flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Our Gallery
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
          >
            Experience the
            <br />
            <span className="text-primary">Journey of Wellness</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-[700px] text-base leading-relaxed text-muted md:text-lg"
          >
            Showcase the peaceful environment, yoga sessions, workshops,
            teacher training, meditation, and community activities.
          </motion.p>
        </motion.div>

        {/* ===== Category Filters ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <motion.button
                key={category}
                variants={fadeUp}
                onClick={() => setActiveFilter(category)}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 font-body text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-white shadow-soft'
                    : 'border border-border bg-white text-dark/70 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {category}
                  <span
                    className={`text-[11px] font-semibold ${
                      isActive ? 'text-white/70' : 'text-dark/30'
                    }`}
                  >
                    {categoryCounts[category]}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ===== Masonry Gallery Grid ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="columns-1 gap-6 sm:columns-2 lg:columns-3"
          >
            {filteredItems.map((item, index) => {
              const isLoaded = loadedIds.has(item.id);
              return (
                <motion.div
                  layout
                  key={item.id}
                  variants={cardVariants}
                  onHoverStart={() => setHoveredId(item.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  onClick={() => goToImage(index)}
                  className={`group relative mb-6 block w-full cursor-pointer overflow-hidden rounded-[24px] bg-dark/5 shadow-soft break-inside-avoid ${item.height}`}
                >
                  {/* Loading skeleton shimmer */}
                  {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-dark/10 via-dark/5 to-dark/10" />
                  )}

                  {/* Image or gradient placeholder */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      onLoad={() => markLoaded(item.id)}
                      className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                        isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-500 ease-out group-hover:scale-110`}
                    />
                  )}

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Hover content — icon + title, rising from the bottom */}
                  <motion.div
                    initial={false}
                    animate={
                      hoveredId === item.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                    }
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5"
                  >
                    <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <FiImage className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-heading text-lg font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="font-body text-xs text-white/70">
                      Click to view
                    </span>
                  </motion.div>

                  {/* Category badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 font-body text-xs font-semibold text-primary backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
                    {item.category}
                  </span>
                </motion.div>
              );
            })}

            {filteredItems.length === 0 && (
              <motion.div
                variants={fadeUp}
                className="col-span-full flex flex-col items-center gap-3 py-20 text-center"
              >
                <FiImage className="h-10 w-10 text-dark/20" />
                <p className="font-body text-muted">
                  No photos in this category yet — check back soon.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ===== Bottom CTA Button ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Button
              as={Link}
              to="/gallery"
              variant="primary"
              size="lg"
              icon={<HiArrowRight className="h-4 w-4" />}
              className="h-[56px] rounded-full px-8 text-base"
            >
              View Full Gallery
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
              aria-label="Close"
            >
              <FiX className="h-6 w-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
              aria-label="Previous"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>

            {/* Image container — swipeable */}
            <div className="relative flex max-h-[75vh] max-w-[90vw] items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={lightboxIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -dragThreshold) nextImage();
                    else if (info.offset.x > dragThreshold) prevImage();
                  }}
                  className="relative max-h-[75vh] max-w-[90vw] cursor-grab overflow-hidden rounded-[24px] active:cursor-grabbing"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredItems[lightboxIndex].image ? (
                    <img
                      src={filteredItems[lightboxIndex].image}
                      alt={filteredItems[lightboxIndex].title}
                      draggable={false}
                      className="max-h-[75vh] w-auto select-none object-contain"
                    />
                  ) : (
                    <div
                      className={`flex h-[60vh] w-[80vw] max-w-[800px] items-center justify-center bg-gradient-to-br ${gradients[lightboxIndex % gradients.length]}`}
                    >
                      <div className="text-center">
                        <FiImage className="mx-auto h-16 w-16 text-white/60" />
                        <p className="mt-4 font-heading text-2xl text-white/80">
                          {filteredItems[lightboxIndex].title}
                        </p>
                        <p className="mt-2 font-body text-sm text-white/60">
                          Image will appear here once added
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption */}
            <p className="mt-5 font-heading text-lg text-white/90">
              {filteredItems[lightboxIndex].title}
            </p>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
              aria-label="Next"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>

            {/* Thumbnail strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-6 flex max-w-[90vw] gap-2 overflow-x-auto px-4 pb-2"
            >
              {filteredItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => goToImage(i)}
                  aria-label={`View ${item.title}`}
                  className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                    i === lightboxIndex
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black/85 opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                  )}
                </button>
              ))}
            </div>

            {/* Image counter */}
            <div className="mt-2 rounded-full bg-white/10 px-4 py-1.5 font-body text-xs text-white backdrop-blur-md">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}