/**
 * ContactCTASection — Premium call-to-action with floating contact card.
 *
 * Features:
 *   - Linear gradient background (#9A3617 → #742711)
 *   - Left (55%): Badge, heading, description, CTA buttons
 *   - Right (45%): Floating white info card with contact details
 *   - Subtle blurred circles + leaf pattern for luxury feel
 *   - Framer Motion: fade up, floating card, button hover
 *   - Responsive: two columns → stack → single column
 */

import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from 'react-icons/fi';

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

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const floating = {
  y: [0, -12, 0],
  transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
};

/* ===== Contact information — swap these for the studio's real details =====
   Studio hours (front-desk / general enquiries) are intentionally separate
   from the batch timings shown in the Hero and FAQ sections — don't merge
   them, since "open 6 AM–8 PM" and "class runs 6:00–7:30 AM" answer
   different questions. */
const contactInfo = {
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@kewalyayogshala.com',
  address: 'Kewalya Yogshala, Rajpur Road, Dehradun, Uttarakhand',
  mapsQuery: 'Kewalya+Yogshala+Rajpur+Road+Dehradun',
  studioHours: 'Mon – Sat, 6:00 AM – 8:00 PM',
};

/* ===== Contact items config — each links somewhere real, nothing is a dead "#" ===== */
const contactItems = [
  {
    icon: <FiPhone className="h-5 w-5" />,
    title: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <FiMail className="h-5 w-5" />,
    title: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: <FiMapPin className="h-5 w-5" />,
    title: 'Address',
    value: contactInfo.address,
    href: `https://www.google.com/maps/search/?api=1&query=${contactInfo.mapsQuery}`,
    external: true,
  },
];

/* ===== Reusable classes ===== */
const iconCircleClass =
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white';

const contactItemClass =
  'group flex items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-soft';

export default function ContactCTASection() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden py-[100px]"
      style={{
        background: 'linear-gradient(135deg, #9a3617 0%, #742711 100%)',
      }}
    >
      {/* ===== Decorative blurred circles ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-secondary/10 blur-2xl" />
      </div>

      {/* ===== Subtle leaf pattern overlay ===== */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 3c-1.5 3-4 5-4 8 0 2.5 1.5 4 4 4s4-1.5 4-4c0-3-2.5-5-4-8z'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative z-10 max-w-[1320px]">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          {/* ===== Left: CTA Content (55%) ===== */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[55%]"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Badge */}
              <motion.span
                variants={fadeUp}
                className="inline-block w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md"
              >
                Let&rsquo;s Begin
              </motion.span>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl"
              >
                Your First Class
                <br />
                <span className="text-secondary-light">Is On Us</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
              >
                One free trial class, no card details, no pressure to
                continue. Pick the Sunrise or Evening batch, tell us if you're
                new to yoga or coming back after an injury, and we'll place
                you with the right instructor — batches are capped at 12, so
                we'll confirm your spot the same day.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-4 flex flex-wrap items-center gap-5"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="lg"
                    icon={<HiArrowRight className="h-4 w-4" />}
                    className="h-[56px] rounded-full px-8 text-base font-semibold"
                  >
                    Book Free Trial
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Button
                    as="a"
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    className="h-[56px] rounded-full border-2 border-white/40 px-8 text-base text-white hover:bg-white hover:text-primary"
                  >
                    WhatsApp Us
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ===== Right: Floating Contact Card (45%) ===== */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[45%]"
          >
            <motion.div
              animate={floating}
              className="rounded-[32px] bg-white p-8 shadow-elevated md:p-10"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Card heading */}
                <motion.div variants={fadeUp} className="mb-2">
                  <h3 className="font-heading text-2xl font-semibold text-dark">
                    Get in Touch
                  </h3>
                  <p className="mt-1 font-body text-sm text-muted">
                    Call, email, or drop by — we reply to WhatsApp within the
                    hour
                  </p>
                </motion.div>

                {/* Contact items — phone, email, address (all real links) */}
                {contactItems.map((item) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    variants={fadeUp}
                    className={contactItemClass}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className={iconCircleClass}>{item.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-body text-xs font-medium uppercase tracking-wider text-muted">
                        {item.title}
                      </span>
                      <span className="mt-0.5 font-heading text-base font-medium text-dark">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                ))}

                {/* Studio hours — informational only, not a link, since it
                    isn't an action a visitor takes */}
                <motion.div variants={fadeUp} className={contactItemClass}>
                  <span className={iconCircleClass}>
                    <FiClock className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-medium uppercase tracking-wider text-muted">
                      Studio Hours
                    </span>
                    <span className="mt-0.5 font-heading text-base font-medium text-dark">
                      {contactInfo.studioHours}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}