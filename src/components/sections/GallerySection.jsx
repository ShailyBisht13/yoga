/**
 * GallerySection — Premium gallery with masonry layout, filters, lightbox.
 *
 * TODO: Add the following images to `src/assets/images/gallery/`:
 *   gallery1.jpg, gallery2.jpg, gallery3.jpg, gallery4.jpg, gallery5.jpg,
 *   gallery6.jpg, gallery7.jpg, gallery8.jpg, gallery9.jpg
 *
 * Once the images are placed in the folder, uncomment the imports below
 * and remove the `placeholder` gradient fallbacks. No JSX changes needed.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/* ===== Gallery images — uncomment when images are added ===== */
// import gallery1 from '@/assets/images/gallery/gallery1.jpg';
// import gallery2 from '@/assets/images/gallery/gallery2.jpg';
// import gallery3 from '@/assets/images/gallery/gallery3.jpg';
// import gallery4 from '@/assets/images/gallery/gallery4.jpg';
// import gallery5 from '@/assets/images/gallery/gallery5.jpg';
// import gallery6 from '@/assets/images/gallery/gallery6.jpg';
// import gallery7 from '@/assets/images/gallery/gallery7.jpg';
// import gallery8 from '@/assets/images/gallery/gallery8.jpg';
// import gallery9 from '@/assets/images/gallery/gallery9.jpg';

/* Placeholder gradients — used until real images are added */
const gallery1 = null;
const gallery2 = null;
const gallery3 = null;
const gallery4 = null;
const gallery5 = null;
const gallery6 = null;
const gallery7 = null;
const gallery8 = null;
const gallery9 = null;

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
  { id: 2, image: gallery2, category: 'Meditation', title: 'Morning Meditation', height: 'h-[400px]' },
  { id: 3, image: gallery3, category: 'Teacher Training', title: 'Teacher Training Program', height: 'h-[280px]' },
  { id: 4, image: gallery4, category: 'Events', title: 'Yoga Retreat Event', height: 'h-[360px]' },
  { id: 5, image: gallery5, category: 'Workshops', title: 'Pranayama Workshop', height: 'h-[300px]' },
  { id: 6, image: gallery6, category: 'Yoga Classes', title: 'Ashtanga Practice', height: 'h-[420px]' },
  { id: 7, image: gallery7, category: 'Meditation', title: 'Sunset Meditation', height: 'h-[280px]' },
  { id: 8, image: gallery8, category: 'Teacher Training', title: 'Alignment Training', height: 'h-[340px]' },
  { id: 9, image: gallery9, category: 'Events', title: 'Community Yoga Day', height: 'h-[380px]' },
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

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* Filtered items based on active category */
  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  /* ===== Lightbox navigation ===== */
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [filteredItems.length]);

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

  return (
    <section
      id="gallery"
      className="bg-[#FAF7F2] py-[120px]"
    >
      <Container className="max-w-[1320px]">
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
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={fadeUp}
              onClick={() => setActiveFilter(category)}
              className={`relative rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-soft'
                  : 'border border-border bg-white text-dark/70 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* ===== Masonry Gallery Grid ===== */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-[24px] shadow-soft ${item.height}`}
            >
              {/* Image or gradient placeholder */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-500 ease-out group-hover:scale-110`}
                />
              )}

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50" />

              {/* Hover content — icon + text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <FiImage className="h-6 w-6 text-white" />
                </div>
                <span className="font-body text-sm font-medium text-white">
                  View Image
                </span>
              </div>

              {/* Category badge */}
              <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 font-body text-xs font-semibold text-primary backdrop-blur-md">
                {item.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
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
              className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Previous"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>

            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-[24px]"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[lightboxIndex].image ? (
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[85vh] w-auto object-contain"
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

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Next"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-md">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}