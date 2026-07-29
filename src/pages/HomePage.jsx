import usePageMeta from '@/hooks/usePageMeta';
import { HeroSection, StatisticsAboutPreview, WhyChooseUs, Services } from '@/components/sections';

export default function HomePage() {
  usePageMeta('home');
  return (
    <>
      <HeroSection />
      <StatisticsAboutPreview />
      <WhyChooseUs />
      <Services />
    </>
  );
}
