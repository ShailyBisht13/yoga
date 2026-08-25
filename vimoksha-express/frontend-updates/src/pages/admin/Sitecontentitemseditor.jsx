import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Admin editor for the 3 photo+text cards shown under each Services
 * section (Classes / Training / Therapy) on the home page.
 *
 * This is separate from your existing "heading/description/image" Site
 * Content form — it only manages the `items` array on the same
 * SiteContent document, so it can be dropped in as its own tab/page
 * without touching that form.
 */

const SECTIONS = [
  { key: 'classes', label: 'Classes' },
  { key: 'training', label: 'Training' },
  { key: 'therapy', label: 'Therapy' },
];

const EMPTY_ITEM = { title: '', description: '', image: '', link: '' };

export default function SiteContentItemsEditor() {
  const [section, setSection] = useState('classes');
  const [items, setItems] = useState([EMPTY_ITEM, EMPTY_ITEM, EMPTY_ITEM]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setMessage(null);

    api
      .getSiteContent(section)
      .then((data) => {
        if (cancelled) return;
        const savedItems = data?.items?.length ? data.items : [];
        // Always show exactly 3 rows to edit, padding with empty ones
        const padded = [0, 1, 2].map((i) => ({ ...EMPTY_ITEM, ...savedItems[i] }));
        setItems(padded);
      })
      .catch(() => {
        if (!cancelled) setMessage({ type: 'error', text: 'Could not load current content.' });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [section]);

  function updateItem(index, field, value) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  async function handleImageUpload(index, file) {
    if (!file) return;
    setUploadingIndex(index);
    setMessage(null);
    try {
      const { url } = await api.uploadContentImage(file);
      updateItem(index, 'image', url);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploadingIndex(null);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      // Drop fully-empty rows so we don't save blank cards
      const cleanItems = items.filter((item) => item.title.trim() || item.description.trim());
      await api.updateSiteContent(section, { items: cleanItems });
      setMessage({ type: 'success', text: 'Saved. The homepage will reflect this shortly.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Section Photos & Text</h1>
      <p className="mt-1 text-sm text-gray-500">
        Edit the 3 photo cards shown under Classes, Training, and Therapy on the homepage.
      </p>

      {/* Section tabs */}
      <div className="mt-6 flex gap-2 border-b border-gray-200">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setSection(s.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              section === s.key
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`mt-4 rounded-lg px-4 py-2.5 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {items.map((item, index) => (
            <div key={index} className="rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700">Card {index + 1}</h2>

              <div className="mt-3 flex flex-col gap-4 sm:flex-row">
                {/* Image */}
                <div className="sm:w-40 sm:flex-shrink-0">
                  <div className="h-28 w-full overflow-hidden rounded-lg bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No photo
                      </div>
                    )}
                  </div>
                  <label className="mt-2 block">
                    <span className="sr-only">Upload photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e.target.files?.[0])}
                      disabled={uploadingIndex === index}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20"
                    />
                    {uploadingIndex === index && (
                      <span className="mt-1 block text-xs text-gray-400">Uploading…</span>
                    )}
                  </label>
                </div>

                {/* Text fields */}
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      placeholder="e.g. Yoga Classes"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Short description shown below the title"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">
                      "Learn More" link
                    </label>
                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => updateItem(index, 'link', e.target.value)}
                      placeholder="/classes/beginner"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      )}
    </div>
  );
}