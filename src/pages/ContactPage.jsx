import { useState } from 'react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
} from 'react-icons/io5';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* ===== Contact details ===== */
const ADDRESS =
  '27, Main Lane, Mohit Nagar, Opp. Wadia Institute, GMS Road, Dehradun, Uttarakhand 248001';

const contactCards = [
  {
    title: 'Visit Us',
    icon: IoLocationOutline,
    lines: [ADDRESS],
  },
  {
    title: 'Call Us',
    icon: IoCallOutline,
    lines: ['+91 90266 12796'],
    href: 'tel:+919026612796',
  },
  {
    title: 'Mail Us',
    icon: IoMailOutline,
    lines: ['info@vimokshayogshala.in', 'vimokshayogshala@gmail.com'],
    hrefs: ['mailto:info@vimokshayogshala.in', 'mailto:vimokshayogshala@gmail.com'],
  },
  {
    title: 'Opening Hours',
    icon: IoTimeOutline,
    lines: ['Mon – Fri : 5:00 AM – 8:00 PM', 'Saturday : 5:00 AM – 12:00 PM'],
  },
];

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

export default function ContactPage() {
  usePageMeta('contact');

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // No backend is wired up yet — this opens the visitor's email client with
    // the form prefilled. Swap this out for a real endpoint (e.g. an API
    // route, Formspree, or EmailJS) when one is available.
    const subject = encodeURIComponent(`New enquiry from ${form.name || 'website visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:info@vimokshayogshala.in?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div data-page="contact">
      {/* ===== Intro / Welcome ===== */}
      <section className="bg-background pt-[160px] pb-[80px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              Get In Touch
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Let's Start Your <span className="text-primary">Practice</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Visit our Dehradun studio, call, or send a message — we'll get
              back to you and help you find the right class to start with.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Contact cards ===== */}
      <section className="bg-white pb-[60px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex flex-col items-center gap-3 rounded-[24px] border border-border bg-white p-7 text-center shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-dark">
                    {card.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {card.lines.map((line, i) =>
                      card.href || card.hrefs ? (
                        <a
                          key={line}
                          href={card.hrefs ? card.hrefs[i] : card.href}
                          className="text-sm leading-relaxed text-muted transition-colors hover:text-primary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm leading-relaxed text-muted">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Map + Form ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch"
          >
            {/* Map */}
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-[28px] border border-border shadow-soft min-h-[420px]"
            >
              <iframe
                title="Vimoksha Yogshala — Dehradun studio location"
                src={MAP_EMBED_SRC}
                className="h-full w-full min-h-[420px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeUp}
              className="rounded-[28px] border border-border bg-white p-8 shadow-soft md:p-10"
            >
              <h2 className="font-heading text-2xl font-semibold text-dark md:text-3xl">
                Send a Message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fill this in and we'll get back to you — or it'll open your
                email app with everything prefilled.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-body text-xs font-semibold uppercase tracking-wide text-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-body text-xs font-semibold uppercase tracking-wide text-muted">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-body text-xs font-semibold uppercase tracking-wide text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-body text-xs font-semibold uppercase tracking-wide text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for — class type, timing, experience level..."
                    className="resize-none rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<HiArrowRight className="h-4 w-4" />}
                  className="mt-2 h-[56px] rounded-full px-8 text-base"
                >
                  Send Message
                </Button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    <IoCheckmarkCircle className="h-4 w-4" />
                    Your email app should be opening now with your message ready to send.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}