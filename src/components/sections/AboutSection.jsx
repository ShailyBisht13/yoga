import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import { fadeInUp, staggerContainer, slideInLeft } from '@/animations';

export default function AboutSection() {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <img
              src="/72f80c8f-f566-427b-9e07-1ae26cbc16e6.png"
              alt="Kewalya Yogshala Yoga Studio"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
            >
              About Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl font-semibold leading-tight text-primary md:text-5xl"
            >
              A Sanctuary for Mind, Body & Soul
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-dark/70 leading-relaxed md:text-xl"
            >
              Nestled in the serene beauty of Dehradun, Kewalya Yogshala is a
              premier yoga studio dedicated to guiding individuals toward
              physical, mental, and spiritual transformation. Whether you are a
              beginner or an advanced practitioner, our studio provides the
              perfect environment for deepening your practice and achieving
              inner harmony.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                as={Link}
                to="/about"
                size="lg"
                icon={<IoArrowForward />}
              >
                Know More About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}