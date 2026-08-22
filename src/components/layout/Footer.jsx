/**
 * Footer — Premium 5-column footer for Vimoksha Yogshala.
 *
 * Features:
 *   - Background #2E2E2E, white text, accent #A98C5A
 *   - Container: max-width 1320px, padding-top 100px, padding-bottom 40px
 *   - Column 1: Logo, description, social icons (FB, IG, YT, Email)
 *   - Column 2: Quick Links
 *   - Column 3: Programs
 *   - Column 4: Contact (each item with icon)
 *   - Column 5: Newsletter (email input + subscribe, validation, rounded)
 *   - Bottom bar: divider, copyright, policy links
 *   - Responsive: Desktop 5-col, Tablet 2-col, Mobile 1-col
 *   - Framer Motion: fade up, hover scale
 *   - React Icons, React Router Links, data arrays mapped
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { contactInfo, siteConfig } from '@/utils/constants';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* ===== Data arrays — no hardcoded repeated data ===== */
const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Classes', path: '/classes' },
  { label: 'Therapies', path: '/classes' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const programs = [
  { label: 'Hatha Yoga', path: '/classes' },
  { label: 'Meditation', path: '/classes' },
  { label: 'Pranayama', path: '/classes' },
  { label: 'Yoga Therapy', path: '/classes' },
  { label: 'Teacher Training', path: '/courses' },
  { label: 'Kids Yoga', path: '/classes' },
];

const socialLinks = [
  { label: 'Facebook', icon: <FaFacebookF />, href: 'https://www.facebook.com/profile.php?id=100063818964128&mibextid=ZbWKwL', external: true },
  { label: 'Instagram', icon: <FaInstagram />, href: 'https://www.instagram.com/vimokshayogshala?igsh=MTQ3M2NkeGMzM3h3dQ==', external: true },
  { label: 'YouTube', icon: <FaYoutube />, href: 'https://youtube.com/@vimokshayogshala?si=r7SS660qdwQqsrOe', external: true },
  { label: 'Email', icon: <FiMail />, href: 'mailto:info@vimokshayogshala.in', external: false },
];

const contactItems = [
  { icon: <FiPhone />, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref },
  { icon: <FiMail />, label: 'Email', value: contactInfo.email, href: contactInfo.emailHref },
  { icon: <FiMapPin />, label: 'Address', value: contactInfo.address, href: '#' },
  { icon: <FiClock />, label: 'Working Hours', value: 'Mon – Sat: 6:00 AM – 8:00 PM', href: '#' },
];

const policyLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
];

/* ===== Reusable class — smooth underline on hover ===== */
const footerLinkClass =
  'relative inline-block w-fit text-sm text-white/70 transition-colors duration-300 hover:text-white ' +
  'after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-secondary ' +
  'after:transition-all after:duration-300 hover:after:w-full';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ type: 'success', message: 'Thank you for subscribing to our newsletter!' });
    setEmail('');
  };

return (
    <footer className="relative z-10 text-white" style={{ background: '#2E2E2E' }}>
      <div
        className="mx-auto px-6"
        style={{ maxWidth: '1320px', paddingTop: '100px', paddingBottom: '40px' }}
      >
        {/* ===== Top: 5-column grid ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* ===== Column 1: Logo + Description + Social ===== */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <Link
              to="/"
              aria-label="Vimoksha Yogshala home"
              className="inline-flex w-fit items-center rounded-2xl bg-white p-3 shadow-soft"
            >
              <img
                src="/logo.png"
                alt="Vimoksha Yogshala"
                className="h-auto w-[140px] object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ===== Column 2: Quick Links ===== */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-heading text-lg font-medium text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== Column 3: Programs ===== */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-heading text-lg font-medium text-white">Programs</h3>
            <ul className="flex flex-col gap-3">
              {programs.map((program) => (
                <li key={program.label}>
                  <Link to={program.path} className={footerLinkClass}>
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== Column 4: Contact ===== */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-heading text-lg font-medium text-white">Contact</h3>
            <ul className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-white/50">
                        {item.label}
                      </span>
                      <span className="text-sm">{item.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== Column 5: Newsletter ===== */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-heading text-lg font-medium text-white">Newsletter</h3>
            <p className="text-sm leading-relaxed text-white/70">
              Subscribe to receive wellness tips, class updates, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.message) setStatus({ type: '', message: '' });
                }}
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 focus:border-secondary"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-secondary/90"
              >
                Subscribe
                <FiArrowRight />
              </motion.button>
              {status.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs ${status.type === 'error' ? 'text-red-400' : 'text-secondary'}`}
                >
                  {status.message}
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-16 pt-8">
          {/* Horizontal Divider */}
          <div className="mb-8 h-px w-full bg-white/10" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
            {/* Left */}
            <p>&copy; 2026 Vimoksha Yogshala. All Rights Reserved.</p>
            {/* Right */}
            <div className="flex flex-wrap items-center gap-6">
              {policyLinks.map((link) => (
                <Link key={link.label} to={link.path} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}