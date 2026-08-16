import usePageMeta from '@/hooks/usePageMeta';
import PathwaysSection from '@/components/sections/PathwaysSection';
import {
  HeroSection,
  WhyChooseUs,
  Services,
  ProgramsSection,
  TestimonialsSection,
  GallerySection,
  BlogsSection,
  FAQSection,
  ContactCTASection,
} from '@/components/sections';

export default function HomePage() {
  usePageMeta('home');
  return (
    <>
      <HeroSection />
      <PathwaysSection />
      <Services />
      <WhyChooseUs />
      <ProgramsSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogsSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}