import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import PageTransition from '@/components/common/PageTransition';
import FloatingActions from '@/components/common/FloatingActions';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <LoadingScreen />
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
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
