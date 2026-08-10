import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoCheckmarkCircle } from 'react-icons/io5';
import { fadeInUp, staggerContainer, slideInLeft } from '@/animations';

/* Concrete numbers instead of another paragraph of wellness language —
   these are the specifics a visitor actually checks before signing up. */
const stats = [
  { value: '15+', label: 'Years Teaching' },
  { value: '6', label: 'Certified Teachers' },
  { value: '500+', label: 'Students Guided' },
];

const credentials = [
  'Yoga Alliance Certified Teachers',
  'Small Batches, Max 12 Students',
];

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
            className="relative order-2 lg:order-1"
          >
            <img
              src="/72f80c8f-f566-427b-9e07-1ae26cbc16e6.png"
              alt="Kewalya Yogshala Yoga Studio"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />

            {/* Founding plaque — the same circular "verified" mark used
                elsewhere on the site, here standing in for a founding seal */}
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-elevated">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <IoCheckmarkCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-dark">
                  Est. 2015
                </p>
                <p className="font-body text-xs text-muted">
                  Founded by Devendra &amp; Radha Uniyal
                </p>
              </div>
            </div>
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
              Kewalya Yogshala was started in 2015 by Devendra and Radha
              Uniyal out of a single rented hall in Dehradun, with eleven
              students. Today it's grown into a full studio — but the
              batches are still kept small on purpose, because the thing
              that changed our own practice was a teacher who noticed when
              our alignment was off.
            </motion.p>

            {/* Credentials */}
            <motion.ul
              variants={fadeInUp}
              className="mt-6 flex flex-col gap-2"
            >
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-dark/70"
                >
                  <IoCheckmarkCircle className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Stat row */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-8 border-y border-border py-6"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col ${
                    i !== stats.length - 1 ? 'pr-8 sm:border-r sm:border-border' : ''
                  }`}
                >
                  <span className="font-heading text-3xl font-semibold text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-body text-xs uppercase tracking-wide text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

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