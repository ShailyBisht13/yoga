import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import {
  LuCalendarCheck,
  LuNewspaper,
  LuImage,
  LuClock,
  LuArrowUpRight,
  LuMail,
  LuPhone,
} from 'react-icons/lu';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  cancelled: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200',
};

function StatCard({ icon: Icon, label, value, hint, accent = 'primary' }) {
  const accentClass =
    accent === 'primary'
      ? 'bg-primary/10 text-primary'
      : accent === 'secondary'
      ? 'bg-secondary/10 text-secondary'
      : accent === 'amber'
      ? 'bg-amber-50 text-amber-600'
      : 'bg-emerald-50 text-emerald-600';

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClass}`}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
      <p className="mt-4 font-heading text-3xl font-semibold text-dark">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([api.getBookings(), api.getAllPosts(), api.getGalleryImages()]).then(
      ([b, p, g]) => {
        setBookings(b.status === 'fulfilled' ? b.value : []);
        setPosts(p.status === 'fulfilled' ? p.value : []);
        setImages(g.status === 'fulfilled' ? g.value : []);
        setLoading(false);
      }
    );
  }, []);

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const publishedCount = posts.filter((p) => p.published).length;
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <AdminShell
      eyebrow="Overview"
      title="Dashboard"
      subtitle="A quick look at bookings, content and the studio gallery."
    >
      {loading ? (
        <p className="text-sm text-muted">Loading dashboard…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={LuCalendarCheck}
              label="Total Bookings"
              value={bookings.length}
              hint={`${pendingCount} pending · ${confirmedCount} confirmed`}
              accent="primary"
            />
            <StatCard
              icon={LuClock}
              label="Pending Bookings"
              value={pendingCount}
              hint="Awaiting confirmation"
              accent="amber"
            />
            <StatCard
              icon={LuNewspaper}
              label="Blog Posts"
              value={posts.length}
              hint={`${publishedCount} published`}
              accent="secondary"
            />
            <StatCard
              icon={LuImage}
              label="Gallery Images"
              value={images.length}
              hint="Across all categories"
              accent="emerald"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h2 className="font-heading text-lg font-semibold text-dark">Recent Bookings</h2>
                <Link
                  to="/admin/bookings"
                  className="flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                >
                  View all
                  <LuArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {recentBookings.length === 0 ? (
                <p className="p-8 text-sm text-muted">No bookings yet.</p>
              ) : (
                <div>
                  {recentBookings.map((b, i) => (
                    <div
                      key={b._id}
                      className={`flex items-center justify-between gap-4 px-6 py-4 ${
                        i !== recentBookings.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-dark">{b.name}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <LuPhone className="h-3 w-3" />
                            {b.phone}
                          </span>
                          {b.email && (
                            <span className="flex items-center gap-1">
                              <LuMail className="h-3 w-3" />
                              {b.email}
                            </span>
                          )}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[b.status] || ''
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h2 className="font-heading text-lg font-semibold text-dark">Quick Links</h2>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/admin/content"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-dark transition-colors hover:bg-[#FBF8F2]"
                >
                  Edit site content
                  <LuArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
                <Link
                  to="/admin/contact"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-dark transition-colors hover:bg-[#FBF8F2]"
                >
                  Update contact info
                  <LuArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
                <Link
                  to="/admin/blog"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-dark transition-colors hover:bg-[#FBF8F2]"
                >
                  Write a blog post
                  <LuArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
                <Link
                  to="/admin/gallery"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-dark transition-colors hover:bg-[#FBF8F2]"
                >
                  Add gallery images
                  <LuArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}