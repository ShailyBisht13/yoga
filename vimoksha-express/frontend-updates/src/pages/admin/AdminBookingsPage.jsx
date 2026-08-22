import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const PAGE_SIZE = 10;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchBookings = () => {
    setLoading(true);
    setError('');
    api
      .getBookings()
      .then((data) => {
        setBookings(data);
        setPage(1); // reset to first page on fresh fetch
      })
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

  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));

  // Keep page in range if bookings shrink (e.g. after delete)
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageBookings = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return bookings.slice(start, start + PAGE_SIZE);
  }, [bookings, page]);

  const rangeStart = bookings.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, bookings.length);

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
        <>
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
                {pageBookings.map((b) => (
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

          {/* Pagination controls */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#85786D]">
              Showing <span className="font-medium text-[#1F1F1F]">{rangeStart}–{rangeEnd}</span> of{' '}
              <span className="font-medium text-[#1F1F1F]">{bookings.length}</span>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full border border-[#EBE5DC] bg-white px-3 py-1.5 text-xs font-medium text-[#665C54] hover:bg-[#FAF8F5] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                // Show first, last, current, and neighbors; collapse the rest
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
                )
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '…' ? (
                    <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-[#85786D]">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 rounded-full text-xs font-medium transition-colors ${
                        p === page
                          ? 'bg-[#8B2E14] text-white'
                          : 'border border-[#EBE5DC] bg-white text-[#665C54] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-[#EBE5DC] bg-white px-3 py-1.5 text-xs font-medium text-[#665C54] hover:bg-[#FAF8F5] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}