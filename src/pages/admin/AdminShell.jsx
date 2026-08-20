import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { clearToken } from '@/lib/api';

const navItems = [
  { label: 'Bookings', path: '/admin/bookings' },
  { label: 'Blog', path: '/admin/blog' },
  { label: 'Gallery', path: '/admin/gallery' },
];

/**
 * Wrap any admin page's content with <AdminShell>...</AdminShell>.
 * Handles the login redirect and renders the sidebar.
 */
export default function AdminShell({ children }) {
  const { authenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted">Loading…</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F7F4F0]">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[#EBE5DC] bg-[#FAF8F5] p-6">
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-xl font-semibold text-[#1F1F1F]"
        >
          Vimoksha Admin
        </h2>
        <nav className="mt-10 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8B2E14] text-white shadow-sm'
                    : 'text-[#665C54] hover:bg-[#8B2E14]/10 hover:text-[#8B2E14]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto rounded-full px-6 py-2.5 text-left text-sm font-medium text-[#665C54] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Log Out
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  );
}
