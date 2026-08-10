import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlinePhone } from 'react-icons/hi';
import { IoArrowForward } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { contactInfo } from '@/utils/constants';
import { navigationLinks } from '@/router/routes';
import Logo from '@/components/common/Logo';
import NavLink from '@/components/common/NavLink';
import Button from '@/components/ui/Button';

/* Height to offset scroll target by, so a section doesn't land hidden
   underneath the fixed pill header. Matches header height + breathing room. */
const SCROLL_OFFSET = 110;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  /* Scrolls to a section id, accounting for the fixed header height */
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  /* If the page loads (or is navigated to) with a #hash already in the URL,
     scroll to that section once the homepage has mounted. */
  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => scrollToId(id), 150);
      return () => clearTimeout(timer);
    }
  }, [isHome, location.hash, scrollToId]);

  /* Every nav link whose path contains a "#" is treated as a homepage
     section link (e.g. "/#gallery") rather than a separate route.
     Links without a "#" (like "/contact") behave as normal page routes. */
  const handleNavClick = (e, path) => {
    const hashIndex = path.indexOf('#');
    if (hashIndex === -1) return; // plain route — let react-router handle it

    e.preventDefault();
    const id = path.slice(hashIndex + 1);
    setIsMobileOpen(false);

    if (isHome) {
      scrollToId(id);
    } else {
      navigate('/');
      // wait for the homepage sections to mount before scrolling
      setTimeout(() => scrollToId(id), 200);
    }
  };

  const topPadding = isScrolled ? 'pt-2' : 'pt-5';
  const pillBg = isScrolled ? 'bg-white/95' : 'bg-white/85';
  const pillShadow = isScrolled ? 'shadow-xl' : 'shadow-lg';

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-500', topPadding)}>
      <div className="mx-auto max-w-[1480px] px-6">
        <div
          className={cn(
            'flex h-[64px] items-center justify-between rounded-full border border-white/20 px-5 backdrop-blur-xl transition-all duration-500 sm:px-8',
            pillBg,
            pillShadow,
          )}
        >
          {/* Logo — 150px, never stretch */}
          <Link to="/" aria-label="Kewalya Yogshala home" className="w-[150px] shrink-0" onClick={() => isMobileOpen && setIsMobileOpen(false)}>
            <img src="/logo.png" alt="Kewalya Yogshala" className="h-auto w-full object-contain" />
          </Link>

          {/* Center navigation — evenly spaced, with breathing room from the logo */}
          <nav className="ml-10 hidden flex-1 items-center justify-evenly lg:flex" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-base font-medium tracking-wide"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={contactInfo.phoneHref}
              className="inline-flex w-[170px] items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-dark whitespace-nowrap transition-colors duration-300 hover:border-primary hover:text-primary"
              style={{ height: '48px' }}
            >
              <HiOutlinePhone className="text-lg shrink-0" />
              <span>{contactInfo.phone}</span>
            </a>
            <Button
              as={Link}
              to="/contact"
              variant="primary"
              icon={<IoArrowForward />}
              className="w-[160px] rounded-full text-sm"
              style={{ height: '48px' }}
            >
              Book Trial
            </Button>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-dark transition-colors lg:hidden"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-full rounded-full bg-current" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu onClose={() => setIsMobileOpen(false)} onNavClick={handleNavClick} />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose, onNavClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={onClose} aria-label="Home" className="w-[140px] sm:w-[180px] lg:w-[200px]">
            <img src="/logo.png" alt="Kewalya Yogshala" className="h-auto w-full object-contain" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-dark"
            aria-label="Close menu"
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <motion.span animate={{ rotate: 45, y: 7 }} transition={{ duration: 0.3 }} className="block h-0.5 w-full rounded-full bg-current" />
              <motion.span animate={{ opacity: 0 }} transition={{ duration: 0.2 }} className="block h-0.5 w-full rounded-full bg-current" />
              <motion.span animate={{ rotate: -45, y: -7 }} transition={{ duration: 0.3 }} className="block h-0.5 w-full rounded-full bg-current" />
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        {navigationLinks.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.07, duration: 0.4 }}
          >
            <NavLink
              to={link.path}
              onClick={(e) => {
                onNavClick(e, link.path);
                onClose();
              }}
              className="font-heading text-2xl font-medium"
            >
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </div>

      <div className="pb-8">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3">
            <a
              href={contactInfo.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
            >
              <HiOutlinePhone className="text-lg" />
              {contactInfo.phone}
            </a>
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-dark"
            >
              Book Trial
              <IoArrowForward />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}