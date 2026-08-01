import usePageMeta from '@/hooks/usePageMeta';
import {
  HeroSection,
  StatisticsAboutPreview,
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
      <StatisticsAboutPreview />
      <WhyChooseUs />
      <Services />
      <ProgramsSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogsSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}