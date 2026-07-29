import usePageMeta from '@/hooks/usePageMeta';
import { HeroSection, Statistics, WhyChooseUs, Services } from '@/components/sections';

export default function HomePage() {
  usePageMeta('home');
  return (
    <>
      <HeroSection />
      <Statistics />
      <WhyChooseUs />
      <Services />
    </>
  );
}
