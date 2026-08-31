import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Fetches admin-edited content for a given site-content section
 * (hero / classes / training / therapy / programs / blogs / gallery / faq)
 * and merges it over fallback defaults, so:
 *  - the page renders the fallback copy immediately (no flash of empty content)
 *  - if the admin has saved content/photos for this section, they are merged in
 *  - fallback fields (descriptions, images, links) are preserved if left blank by admin
 *  - if the fetch fails, the original fallback copy remains intact.
 *
 * @param {string} section - 'hero' | 'classes' | 'training' | 'therapy' | 'programs' | 'blogs' | 'gallery' | 'faq'
 * @param {object} fallback - the hardcoded copy/items for this section
 */
export default function useSiteContent(section, fallback) {
  const [content, setContent] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api
      .getSiteContent(section)
      .then((data) => {
        if (cancelled || !data) return;

        const hasSavedItems = Array.isArray(data.items) && data.items.length > 0;
        const hasSavedFields =
          Boolean(data.heading?.trim()) ||
          Boolean(data.subheading?.trim()) ||
          Boolean(data.description?.trim()) ||
          Boolean(data.image?.trim()) ||
          (Array.isArray(data.features) && data.features.length > 0);

        if (!hasSavedItems && !hasSavedFields) return; // Admin hasn't saved content for this section yet

        let mergedItems = fallback.items || [];

        if (hasSavedItems) {
          const maxLen = Math.max(fallback.items?.length || 0, data.items.length);
          mergedItems = Array.from({ length: maxLen }, (_, i) => {
            const fallbackItem = fallback.items?.[i] || {};
            const savedItem = data.items[i];

            if (!savedItem) return fallbackItem;

            const savedHasContent = Boolean(
              savedItem.title?.trim() ||
                savedItem.description?.trim() ||
                savedItem.image?.trim() ||
                savedItem.category?.trim() ||
                savedItem.link?.trim() ||
                savedItem.duration?.trim() ||
                savedItem.difficulty?.trim() ||
                savedItem.date?.trim() ||
                savedItem.readTime?.trim()
            );

            if (!savedHasContent) return fallbackItem;

            return {
              ...fallbackItem,
              ...savedItem,
              title: savedItem.title?.trim() ? savedItem.title : (fallbackItem.title || ''),
              description: savedItem.description?.trim() ? savedItem.description : (fallbackItem.description || ''),
              image: savedItem.image?.trim() ? savedItem.image : (fallbackItem.image || ''),
              category: savedItem.category?.trim() ? savedItem.category : (fallbackItem.category || ''),
              link: savedItem.link?.trim() ? savedItem.link : (fallbackItem.link || ''),
              duration: savedItem.duration?.trim() ? savedItem.duration : (fallbackItem.duration || ''),
              difficulty: savedItem.difficulty?.trim() ? savedItem.difficulty : (fallbackItem.difficulty || ''),
              date: savedItem.date?.trim() ? savedItem.date : (fallbackItem.date || ''),
              readTime: savedItem.readTime?.trim() ? savedItem.readTime : (fallbackItem.readTime || ''),
            };
          }).filter(
            (item) => Boolean(item.title?.trim()) || Boolean(item.description?.trim()) || Boolean(item.image?.trim())
          );
        }

        setContent({
          ...fallback,
          ...data,
          heading: data.heading?.trim() ? data.heading : fallback.heading,
          subheading: data.subheading?.trim() ? data.subheading : fallback.subheading,
          description: data.description?.trim() ? data.description : fallback.description,
          image: data.image?.trim() ? data.image : fallback.image,
          ctaText: data.ctaText?.trim() ? data.ctaText : fallback.ctaText,
          ctaLink: data.ctaLink?.trim() ? data.ctaLink : fallback.ctaLink,
          features: Array.isArray(data.features) && data.features.length ? data.features : fallback.features || [],
          items: mergedItems,
        });
      })
      .catch(() => {
        /* Network or server issue — keep fallback */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return { content, loaded };
}

