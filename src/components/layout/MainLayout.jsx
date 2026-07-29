import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import PageTransition from '@/components/common/PageTransition';

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
