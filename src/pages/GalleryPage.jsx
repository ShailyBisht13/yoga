import usePageMeta from '@/hooks/usePageMeta';

export default function GalleryPage() {
  usePageMeta('gallery');
  return <div data-page="gallery" />;
}
