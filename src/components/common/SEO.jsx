/**
 * SEO — Dynamic SEO meta tags, OpenGraph, Twitter Cards, and Structured Data.
 *
 * Features:
 *   - Updates document title and meta description
 *   - OpenGraph tags (og:title, og:description, og:image, og:url, og:type)
 *   - Twitter Card tags
 *   - JSON-LD structured data (LocalBusiness / YogaStudio)
 *   - Canonical link
 *   - Cleans up tags on unmount
 */

import { useEffect } from 'react';
import { siteConfig } from '@/utils/constants';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: '+919026612796',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=100063818964128&mibextid=ZbWKwL',
    'https://www.instagram.com/vimokshayogshala',
    'https://youtube.com/@vimokshayogshala',
  ],
};

export default function SEO({
  title,
  description,
  image = '/logo.png',
  url = siteConfig.url,
  type = 'website',
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const desc = description || siteConfig.description;
    const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
    const pageUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;

    document.title = fullTitle;

    // Standard meta
    upsertMeta('name', 'description', desc);
    upsertLink('canonical', pageUrl);

    // OpenGraph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', siteConfig.name);

    // Twitter Cards
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', imageUrl);

    // Structured Data
    upsertJsonLd('business-jsonld', businessJsonLd);
  }, [title, description, image, url, type]);

  return null;
}