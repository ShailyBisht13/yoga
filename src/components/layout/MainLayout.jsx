import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import PageTransition from '@/components/common/PageTransition';
import FloatingActions from '@/components/common/FloatingActions';
import BookTrialModal from '@/components/common/BookTrialModal';

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTop />
      <BookTrialModal />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="relative z-10 flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}