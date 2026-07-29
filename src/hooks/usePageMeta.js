import { useEffect } from 'react';
import { routeMeta } from '@/router/routes';

function usePageMeta(metaKey) {
  const meta = routeMeta[metaKey];

  useEffect(() => {
    if (meta?.title) {
      document.title = `${meta.title} | Kewalya Yogshala`;
    }
    if (meta?.description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
    }
  }, [meta]);
}

export default usePageMeta;
