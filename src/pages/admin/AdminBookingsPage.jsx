import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = () => {
    setLoading(true);
    setError('');
    api
      .getBookings()
      .then(setBookings)
      .catch((err) => {
        setBookings([]);
        setError(err.message || 'Failed to fetch bookings from server.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchBookings, []);

  const updateStatus = async (id, status) => {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    try {
      await api.updateBookingStatus(id, status);
    } catch {
      fetchBookings(); // revert on failure by refetching
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
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-semibold text-[#1F1F1F]"
          >
            Trial Bookings & Enquiries
          </h1>
          <p className="mt-1 text-sm text-[#85786D]">{bookings.length} total submissions</p>
        </div>
        <button
          onClick={fetchBookings}
          className="rounded-full border border-[#EBE5DC] bg-white px-4 py-2 text-xs font-medium text-[#665C54] hover:bg-[#FAF8F5]"
        >
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Connection Error</p>
          <p className="mt-1 text-xs opacity-90">{error}</p>
          <p className="mt-2 text-xs font-medium">
            Make sure your backend server is running (`npm run server` on port 5000).
          </p>
        </div>
      )}

      {loading && <p className="mt-6 text-[#85786D]">Loading bookings…</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="mt-6 text-[#85786D]">No bookings or contact submissions yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-[#EBE5DC] bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-[#EBE5DC] bg-[#FAF8F5] text-xs font-semibold uppercase tracking-wider text-[#786B60]">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Batch / Type</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {bookings.map((b) => (
                <tr key={b._id} className="transition-colors hover:bg-[#FDFCFB]">
                  <td className="px-6 py-4 font-medium text-[#1F1F1F] whitespace-nowrap">{b.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={`tel:${b.phone}`} className="text-[#8B2E14] font-medium hover:underline">
                      {b.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-[#665C54]">{b.email || '—'}</td>
                  <td className="px-6 py-4 text-[#665C54] whitespace-nowrap">{b.preferredBatch || '—'}</td>
                  <td className="max-w-[280px] px-6 py-4 text-[#665C54]" title={b.message}>
                    {b.message || '—'}
                  </td>
                  <td className="px-6 py-4 text-xs text-[#85786D] whitespace-nowrap">
                    {new Date(b.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none cursor-pointer ${statusColors[b.status] || ''}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
