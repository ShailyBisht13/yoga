import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Fetches admin-edited content for a given site-content section
 * (hero / classes / training / therapy) and merges it over sensible
 * fallback defaults, so:
 *  - the page renders the fallback copy immediately (no flash of empty content)
 *  - if the admin has saved content for this section, it's swapped in
 *  - if the fetch fails, or the admin hasn't touched this section yet,
 *    the original fallback copy just stays â€” the site never breaks.
 *
 * @param {string} section - 'hero' | 'classes' | 'training' | 'therapy'
 * @param {object} fallback - the current hardcoded copy for this section
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
        const hasSavedContent =
          data.heading?.trim() ||
          data.description?.trim() ||
          data.image?.trim() ||
          data.items?.length;
        if (!hasSavedContent) return; // admin hasn't set this section yet â€” keep fallback
        const mergedItems = (fallback.items || []).map((fallbackItem, i) => {
          const savedItem = data.items?.[i];
          const savedHasContent =
            savedItem && (savedItem.title?.trim() || savedItem.description?.trim());
          return savedHasContent ? savedItem : fallbackItem;
        });
        setContent({
          ...fallback,
          ...data,
          heading: data.heading?.trim() ? data.heading : fallback.heading,
          subheading: data.subheading?.trim() ? data.subheading : fallback.subheading,
          description: data.description?.trim() ? data.description : fallback.description,
          image: data.image?.trim() ? data.image : fallback.image,
          features: data.features?.length ? data.features : fallback.features || [],
          items: mergedItems,
        });
      })
      .catch(() => {
        /* network/backend issue â€” silently keep the fallback copy */
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
