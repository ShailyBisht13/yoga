import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

// FAQ isn't a separate backend resource — it's stored on the same
// SiteContent document as Hero/Training/Therapy/Classes, under
// section: 'faq'. Each item's `title` doubles as the question and
// `description` doubles as the answer.
const EMPTY_ITEM = { title: '', description: '' };

export default function AdminFaqPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const fetchFaqs = () => {
    setLoading(true);
    setError('');
    setSaved(false);
    api
      .getSiteContent('faq')
      .then((data) => {
        const savedItems = data?.items?.length ? data.items : [EMPTY_ITEM];
        setItems(savedItems.map((i) => ({ title: i.title || '', description: i.description || '' })));
      })
      .catch((err) => setError(err.message || 'Failed to load FAQs.'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFaqs, []);

  const updateItem = (index, field, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    setSaved(false);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      // Drop fully-empty rows so we don't save blank FAQ entries
      const cleanItems = items.filter((i) => i.title.trim() || i.description.trim());
      await api.updateSiteContent('faq', { items: cleanItems });
      setItems(cleanItems.length ? cleanItems : [EMPTY_ITEM]);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Failed to save FAQs.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary';
  const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted';

  return (
    <AdminShell
      eyebrow="Site Content"
      title="FAQs"
      subtitle="Manage the questions and answers shown on your FAQ section."
    >
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {saved && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Saved.
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="rounded-2xl border border-border bg-white p-7 shadow-soft">
          <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <div key={index} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    FAQ {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove FAQ"
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Question</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      placeholder="e.g. Do I need prior yoga experience?"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Answer</label>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Write the answer shown to visitors"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
          >
            <LuPlus className="h-3.5 w-3.5" />
            Add another FAQ
          </button>

          <div className="mt-6 border-t border-border pt-5">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}