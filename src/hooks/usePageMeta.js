/**
 * usePageMeta — Dynamic page meta tags with SEO support.
 *
 * Features:
 *   - Sets document title and meta description
 *   - Updates OpenGraph and Twitter Card tags per page
 *   - Updates canonical URL
 *   - Works with routeMeta from router/routes.js
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta } from '@/router/routes';
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

function usePageMeta(metaKey) {
  const meta = routeMeta[metaKey];
  const location = useLocation();

  useEffect(() => {
    if (!meta) return;

    const fullTitle = `${meta.title} | ${siteConfig.name}`;
    const desc = meta.description || siteConfig.description;
    const pageUrl = `${siteConfig.url}${location.pathname}`;

    // Standard meta
    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertLink('canonical', pageUrl);

    // OpenGraph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:type', 'website');

    // Twitter Cards
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
  }, [meta, location.pathname]);
}

export default usePageMeta;