import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Container } from '@/components/ui';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api
      .getGalleryImages()
      .then(setImages)
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean))];
  const filtered =
    activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  return (
    <section className="py-20">
      <Container className="max-w-[1200px]">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-4xl font-semibold text-dark md:text-5xl">Gallery</h1>
          <p className="mt-3 text-muted">A glimpse into life at Vimoksha Yogshala.</p>
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

        {loading && <p className="text-center text-muted">Loading gallery…</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted">No images yet — check back soon.</p>
        )}

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img._id}
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
