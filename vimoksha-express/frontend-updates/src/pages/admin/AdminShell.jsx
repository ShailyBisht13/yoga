import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { clearToken } from '@/lib/api';
import { LuCalendarCheck, LuNewspaper, LuImage, LuLogOut } from 'react-icons/lu';

const navItems = [
  { label: 'Bookings', path: '/admin/bookings', icon: LuCalendarCheck },
  { label: 'Blog', path: '/admin/blog', icon: LuNewspaper },
  { label: 'Gallery', path: '/admin/gallery', icon: LuImage },
];

/** Decorative sunburst mark echoing the Vimoksha logo — used once, as a watermark. */
function Sunburst({ className }) {
  const rays = Array.from({ length: 16 });
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {rays.map((_, i) => (
        <rect
          key={i}
          x="49"
          y="2"
          width="2"
          height="26"
          rx="1"
          fill="currentColor"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="18" fill="currentColor" />
    </svg>
  );
}

/**
 * Wrap any admin page's content with <AdminShell>. Pass `eyebrow`, `title`,
 * `subtitle` and `actions` to render the page header consistently.
 */
export default function AdminShell({ children, eyebrow, title, subtitle, actions }) {
  const { authenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF8F2]">
        <div className="flex flex-col items-center gap-3 text-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
          <p className="text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  const currentNav = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="flex min-h-screen bg-[#FBF8F2]">
      {/* Sidebar */}
      <aside className="relative flex w-72 shrink-0 flex-col overflow-hidden bg-[#241611]">
        <Sunburst className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 text-secondary opacity-[0.07]" />

        <div className="relative z-10 px-7 pb-7 pt-9">
          <div className="inline-block rounded-xl bg-[#FBF8F2] px-4 py-3 shadow-elevated">
            <img src="/logo.png" alt="Vimoksha Yogshala" className="h-8 w-auto" />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-light">
            Administrator Console
          </p>
        </div>

        <div className="relative z-10 mx-7 h-px bg-gradient-to-r from-secondary/60 via-white/10 to-transparent" />

        <nav className="relative z-10 flex flex-1 flex-col gap-1 px-4 pt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.08] text-white shadow-[inset_3px_0_0_0_var(--color-secondary)]'
                      : 'text-[#C9BBA9] hover:bg-white/[0.05] hover:text-white'
                  }`
                }
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="relative z-10 mt-auto border-t border-white/10 px-4 py-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C9BBA9] transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <LuLogOut className="h-[18px] w-[18px]" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {(title || actions) && (
          <header className="border-b border-border bg-white/80 px-10 py-8 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
              {eyebrow || currentNav?.label || 'Dashboard'}
            </p>
            <div className="mt-1.5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl font-semibold text-dark">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
          </header>
        )}
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
