import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import { LuCalendarCheck, LuTrash2 } from 'react-icons/lu';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  cancelled: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    api
      .getBookings()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchBookings, []);

  const updateStatus = async (id, status) => {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    try {
      await api.updateBookingStatus(id, status);
    } catch {
      fetchBookings();
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    setBookings((prev) => prev.filter((b) => b._id !== id));
    try {
      await api.deleteBooking(id);
    } catch {
      fetchBookings();
    }
  };

  return (
    <AdminShell
      eyebrow="Bookings"
      title="Trial Bookings"
      subtitle={`${bookings.length} submission${bookings.length === 1 ? '' : 's'} received`}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        {loading && <p className="p-8 text-sm text-muted">Loading bookings…</p>}

        {!loading && bookings.length === 0 && (
          <div className="flex flex-col items-center gap-3 p-16 text-center">
            <LuCalendarCheck className="h-8 w-8 text-secondary-light" />
            <div>
              <p className="font-medium text-dark">No bookings yet</p>
              <p className="mt-1 text-sm text-muted">
                Submissions from the trial-class form will appear here.
              </p>
            </div>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-[#FBF8F2] text-[11px] font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Phone</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Batch</th>
                  <th className="px-6 py-3.5">Message</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-border last:border-0 hover:bg-[#FBF8F2]/60">
                    <td className="px-6 py-4 font-medium text-dark">{b.name}</td>
                    <td className="px-6 py-4">
                      <a href={`tel:${b.phone}`} className="text-secondary hover:underline">
                        {b.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-muted">{b.email || '—'}</td>
                    <td className="px-6 py-4 text-muted">{b.preferredBatch || '—'}</td>
                    <td className="max-w-[200px] truncate px-6 py-4 text-muted" title={b.message}>
                      {b.message || '—'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted">
                      {new Date(b.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                          statusStyles[b.status] || ''
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete booking"
                      >
                        <LuTrash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
