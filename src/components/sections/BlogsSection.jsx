/**
 * BlogsSection — Latest blogs with premium card design.
 *
 * TODO: Add the following images to `src/assets/images/blogs/`:
 *   blog1.jpg, blog2.jpg, blog3.jpg
 *
 * Once the images are placed in the folder, uncomment the imports below
 * and remove the `placeholder` gradient fallbacks. No JSX changes needed.
 */

import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { IoTimeOutline, IoCalendarOutline } from 'react-icons/io5';
import { FiArrowUpRight } from 'react-icons/fi';

/* ===== Blog images — uncomment when images are added ===== */
// import blog1 from '@/assets/images/blogs/blog1.jpg';
// import blog2 from '@/assets/images/blogs/blog2.jpg';
// import blog3 from '@/assets/images/blogs/blog3.jpg';

/* Placeholder nulls — used until real images are added */
const blog1 = null;
const blog2 = null;
const blog3 = null;

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ===== Category badge styles ===== */
const categoryStyles = {
  Yoga: 'bg-primary/10 text-primary',
  Meditation: 'bg-secondary/15 text-secondary',
  Lifestyle: 'bg-primary-dark/10 text-primary-dark',
};

/* ===== Placeholder gradient colors ===== */
const gradients = [
  'from-primary/30 to-primary-dark/40',
  'from-secondary/30 to-secondary-light/40',
  'from-primary-light/30 to-primary/40',
];

/* ===== Blog data ===== */
const blogs = [
  {
    title: 'Benefits of Daily Yoga Practice',
    category: 'Yoga',
    readTime: '5 min',
    date: 'July 15, 2026',
    excerpt:
      'Discover how incorporating yoga into your daily routine can transform your physical health, mental clarity, and overall well-being.',
    image: blog1,
    link: '/blog',
  },
  {
    title: 'Meditation for Mental Peace',
    category: 'Meditation',
    readTime: '7 min',
    date: 'July 10, 2026',
    excerpt:
      'Learn powerful meditation techniques to calm your mind, reduce anxiety, and cultivate lasting inner peace and emotional balance.',
    image: blog2,
    link: '/blog',
  },
  {
    title: 'Healthy Morning Routine',
    category: 'Lifestyle',
    readTime: '6 min',
    date: 'July 5, 2026',
    excerpt:
      'Build a nourishing morning routine with yoga, pranayama, and mindful habits that set the tone for a productive and balanced day.',
    image: blog3,
    link: '/blog',
  },
];

export default function BlogsSection() {
  return (
    <section
      id="blogs"
      className="bg-white py-[120px]"
    >
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-16 flex max-w-[700px] flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Latest Blogs
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
          >
            Latest Articles &
            <br />
            <span className="text-primary">Wellness Insights</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-[700px] text-base leading-relaxed text-muted md:text-lg"
          >
            Share expert yoga tips, meditation techniques, healthy lifestyle
            advice, and wellness knowledge.
          </motion.p>
        </motion.div>

        {/* ===== Blog Cards Grid ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              variants={fadeUp}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft transition-shadow duration-300 hover:shadow-elevated"
            >
              {/* Featured image */}
              <div className="relative overflow-hidden rounded-t-[28px]">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-[240px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`flex h-[240px] w-full items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-500 ease-out group-hover:scale-110`}
                  >
                    <span className="font-heading text-xl text-white/60">
                      {blog.category}
                    </span>
                  </div>
                )}

                {/* Category badge overlay */}
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 font-body text-xs font-semibold backdrop-blur-md ${
                    categoryStyles[blog.category] || 'bg-white/80 text-dark'
                  }`}
                >
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date & reading time */}
                <div className="mb-4 flex items-center gap-4 font-body text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <IoCalendarOutline className="h-4 w-4 text-primary" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IoTimeOutline className="h-4 w-4 text-primary" />
                    {blog.readTime} read
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold leading-snug text-dark transition-colors group-hover:text-primary">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {blog.excerpt}
                </p>

                {/* Read More button */}
                <Link
                  to={blog.link}
                  className="mt-6 inline-flex items-center gap-2 self-start font-body text-sm font-medium text-primary transition-all duration-300 hover:gap-3"
                >
                  Read More
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== View All Articles Button ===== */}
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
              to="/blog"
              variant="primary"
              size="lg"
              icon={<HiArrowRight className="h-4 w-4" />}
              className="h-[56px] rounded-full px-8 text-base"
            >
              View All Articles
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}