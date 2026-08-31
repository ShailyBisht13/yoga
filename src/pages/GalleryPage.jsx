import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Container } from '@/components/ui';
import useSiteContent from '@/hooks/useSiteContent';

import gallery1 from '@/assets/images/gallery/gallery1.jpg';
import gallery2 from '@/assets/images/gallery/gallery2.jpg';
import gallery3 from '@/assets/images/gallery/gallery3.jpg';
import gallery4 from '@/assets/images/gallery/gallery10.webp';
import gallery5 from '@/assets/images/gallery/gallery5.jpg';
import gallery6 from '@/assets/images/gallery/gallery6.jpg';
import gallery7 from '@/assets/images/gallery/gallery7.jpg';
import gallery8 from '@/assets/images/gallery/gallery8.jpg';
import gallery9 from '@/assets/images/gallery/gallery9.jpg';

const galleryFallbackItems = [
  { image: gallery1, category: 'Yoga Classes', title: 'Hatha Yoga Session' },
  { image: gallery2, category: 'Meditation', title: 'Morning Meditation' },
  { image: gallery3, category: 'Teacher Training', title: 'Teacher Training Program' },
  { image: gallery4, category: 'Events', title: 'Yoga Retreat Event' },
  { image: gallery5, category: 'Workshops', title: 'Pranayama Workshop' },
  { image: gallery6, category: 'Yoga Classes', title: 'Ashtanga Practice' },
  { image: gallery7, category: 'Meditation', title: 'Sunset Meditation' },
  { image: gallery8, category: 'Teacher Training', title: 'Alignment Training' },
  { image: gallery9, category: 'Events', title: 'Community Yoga Day' },
];

const galleryFallback = {
  heading: 'Our Gallery',
  subheading: 'Vimoksha Yogshala',
  description: 'A glimpse into life, practice, and community at Vimoksha Yogshala.',
  image: '',
  features: [],
  items: galleryFallbackItems,
};

export default function GalleryPage() {
  const { content, loaded } = useSiteContent('gallery', galleryFallback);
  const [dbImages, setDbImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api
      .getGalleryImages()
      .then((data) => setDbImages(data || []))
      .catch(() => setDbImages([]));
  }, []);

  const allGalleryItems = useMemo(() => {
    const siteContentItems = (content.items || []).map((item, idx) => ({
      id: `content-${idx}`,
      imageUrl: item.image,
      title: item.title,
      category: item.category || 'Yoga Classes',
    }));

    const standaloneUploads = dbImages.map((img) => ({
      id: img._id,
      imageUrl: img.imageUrl,
      title: img.title,
      category: img.category || 'General',
    }));

    const combined = [...standaloneUploads, ...siteContentItems].filter((item) => Boolean(item.imageUrl));
    return combined.length ? combined : galleryFallbackItems.map((item, idx) => ({
      id: `fallback-${idx}`,
      imageUrl: item.image,
      title: item.title,
      category: item.category,
    }));
  }, [content.items, dbImages]);

  const categories = useMemo(
    () => ['All', ...new Set(allGalleryItems.map((img) => img.category).filter(Boolean))],
    [allGalleryItems]
  );

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? allGalleryItems
        : allGalleryItems.filter((img) => img.category === activeCategory),
    [activeCategory, allGalleryItems]
  );

  return (
    <section className="py-20">
      <Container className="max-w-[1200px]">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-4xl font-semibold text-dark md:text-5xl">
            {content.heading || 'Gallery'}
          </h1>
          <p className="mt-3 text-muted">
            {content.description || 'A glimpse into life at Vimoksha Yogshala.'}
          </p>
        </div>

        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
                  activeCategory === cat
                    ? 'border-primary bg-primary text-white'
                    : 'border-border text-muted hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {!loaded && <p className="text-center text-muted">Loading gallery…</p>}
        {loaded && filtered.length === 0 && (
          <p className="text-center text-muted">No images yet — check back soon.</p>
        )}

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            >
              <img
                src={img.imageUrl}
                alt={img.title || 'Gallery image'}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

