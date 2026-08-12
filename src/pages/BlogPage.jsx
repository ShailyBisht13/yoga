import usePageMeta from '@/hooks/usePageMeta';
import BlogsSection from '@/components/sections/BlogsSection';

export default function BlogPage() {
  usePageMeta('blog');

  return (
    <div data-page="blog" className="pt-[90px] sm:pt-[110px]">
      <BlogsSection />
    </div>
  );
}