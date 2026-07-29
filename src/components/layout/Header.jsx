import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { IoArrowForward } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { contactInfo } from '@/utils/constants';
import { navigationLinks } from '@/router/routes';
import Logo from '@/components/common/Logo';
import NavLink from '@/components/common/NavLink';
import { Button, Container } from '@/components/ui';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/90 py-3 shadow-soft backdrop-blur-md'
          : 'bg-transparent py-5',
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link to="/" aria-label="Kewalya Yogshala home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <NavLink key={link.path} to={link.path}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              as="a"
              href={contactInfo.phoneHref}
              variant="ghost"
              size="sm"
              icon={<HiOutlinePhone className="text-lg" />}
              iconPosition="left"
            >
              {contactInfo.phone}
            </Button>
            <Button
              as={Link}
              to="/contact"
              size="sm"
              icon={<IoArrowForward />}
            >
              Book Free Trial
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-dark lg:hidden"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 className="text-xl" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu onClose={() => setIsMobileOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-background p-6 shadow-elevated"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mobile navigation"
      >
        <div className="mb-8 flex items-center justify-between">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
            aria-label="Close menu"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {navigationLinks.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={onClose} className="text-base">
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button
            as="a"
            href={contactInfo.phoneHref}
            variant="ghost"
            icon={<HiOutlinePhone />}
            iconPosition="left"
          >
            {contactInfo.phone}
          </Button>
          <Button as={Link} to="/contact" onClick={onClose} icon={<IoArrowForward />}>
            Book Free Trial
          </Button>
        </div>
      </motion.nav>
    </motion.div>
  );
}
