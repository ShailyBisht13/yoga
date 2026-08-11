import usePageMeta from '@/hooks/usePageMeta';
import GallerySection from '@/components/sections/GallerySection';

export default function GalleryPage() {
  usePageMeta('gallery');

  return (
    <div data-page="gallery" className="pt-[110px]">
      <GallerySection />
    </div>
  );
}
