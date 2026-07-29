import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { contactInfo, socialLinks, siteConfig } from '@/utils/constants';
import { navigationLinks } from '@/router/routes';
import Logo from '@/components/common/Logo';
import { Container } from '@/components/ui';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <SocialIcon href={socialLinks.facebook} label="Facebook">
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon href={socialLinks.instagram} label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href={socialLinks.youtube} label="YouTube">
                <FaYoutube />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-dark">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-dark">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href={contactInfo.phoneHref} className="transition-colors hover:text-primary">
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={contactInfo.emailHref} className="transition-colors hover:text-primary">
                  {contactInfo.email}
                </a>
              </li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-dark">
              Visit Us
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Established {siteConfig.established}. Experience holistic wellness through yoga,
              Ayurveda, and therapeutic practices.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs uppercase tracking-wider">Dehradun, Uttarakhand</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-all hover:border-secondary hover:bg-secondary hover:text-white"
    >
      {children}
    </a>
  );
}
