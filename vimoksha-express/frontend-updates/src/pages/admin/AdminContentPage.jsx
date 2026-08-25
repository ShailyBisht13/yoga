import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import { LuHouse, LuDumbbell, LuHeartPulse, LuUsers, LuPlus, LuTrash2 } from 'react-icons/lu';

const sections = [
  { key: 'hero', label: 'Hero Section', icon: LuHouse },
  { key: 'training', label: 'Training', icon: LuDumbbell },
  { key: 'therapy', label: 'Therapy', icon: LuHeartPulse },
  { key: 'classes', label: 'Classes', icon: LuUsers },
];

const emptySection = {
  heading: '',
  subheading: '',
  description: '',
  image: '',
  ctaText: '',
  ctaLink: '',
  features: [],
  items: [],
};

const EMPTY_ITEM = { title: '', description: '', image: '', link: '' };
// Sections that show the 3-card grid on the homepage (Hero has no cards)
const SECTIONS_WITH_ITEMS = ['training', 'therapy', 'classes'];

export default function AdminContentPage() {
  const [active, setActive] = useState('hero');
  const [form, setForm] = useState(emptySection);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [uploadingItemIndex, setUploadingItemIndex] = useState(null);

  const loadSection = (key) => {
    setLoading(true);
    setSaved(false);
    setError('');
    api
      .getSiteContent(key)
      .then((data) => {
        const savedItems = data?.items || [];
        const paddedItems = [0, 1, 2].map((i) => ({ ...EMPTY_ITEM, ...savedItems[i] }));
        setForm({
          ...emptySection,
          ...data,
          features: data?.features || [],
          items: paddedItems,
        });
      })
      .catch(() => setForm({ ...emptySection, items: [EMPTY_ITEM, EMPTY_ITEM, EMPTY_ITEM] }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSection(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await api.uploadContentImage(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    }
    setUploading(false);
  };

  const updateFeature = (i, value) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[i] = value;
      return { ...prev, features };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (i) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  };

  const updateItem = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
    setSaved(false);
  };

  const handleItemImageUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingItemIndex(index);
    setError('');
    try {
      const { url } = await api.uploadContentImage(file);
      updateItem(index, 'image', url);
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    }
    setUploadingItemIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const payload = {
        ...form,
        features: form.features.map((f) => f.trim()).filter(Boolean),
      };
      if (SECTIONS_WITH_ITEMS.includes(active)) {
        payload.items = form.items.filter(
          (item) => item.title.trim() || item.description.trim()
        );
      } else {
        delete payload.items;
      }
      await api.updateSiteContent(active, payload);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Save failed.');
    }
    setSaving(false);
  };

  const inputClass =
    'w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary';
  const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted';

  return (
    <AdminShell
      eyebrow="Site Content"
      title="Page Content"
      subtitle="Edit the text and images shown on the Hero, Training, Therapy and Classes sections."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'border border-border bg-white text-muted hover:bg-[#FBF8F2]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-7 shadow-soft"
        >
          <div>
            <label className={labelClass}>Heading</label>
            <input name="heading" value={form.heading} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Subheading</label>
            <input
              name="subheading"
              value={form.subheading}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-primary-dark"
            />
            {uploading && <p className="mt-2 text-xs text-muted">Uploading…</p>}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-3 h-36 w-auto rounded-lg border border-border object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Button Text</label>
              <input
                name="ctaText"
                value={form.ctaText}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Book a Trial Class"
              />
            </div>
            <div>
              <label className={labelClass}>Button Link</label>
              <input
                name="ctaLink"
                value={form.ctaLink}
                onChange={handleChange}
                className={inputClass}
                placeholder="/contact"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className={labelClass}>Highlights / Features</label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
              >
                <LuPlus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {form.features.length === 0 && (
                <p className="text-xs text-muted">No highlights added yet.</p>
              )}
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className={inputClass}
                    placeholder={`Highlight ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove highlight"
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {SECTIONS_WITH_ITEMS.includes(active) && (
            <div className="border-t border-border pt-5">
              <label className={labelClass}>Section Cards (3 photos shown below)</label>
              <p className="mb-3 text-xs text-muted">
                These are the 3 photo cards displayed under this section on the homepage.
              </p>
              <div className="flex flex-col gap-4">
                {form.items.map((item, index) => (
                  <div key={index} className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      Card {index + 1}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="sm:w-36 sm:shrink-0">
                        <div className="h-24 w-full overflow-hidden rounded-lg bg-[#FBF8F2]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[11px] text-muted">
                              No photo
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleItemImageUpload(index, e)}
                          className="mt-2 w-full text-[11px] text-muted file:mr-2 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-white file:transition-colors hover:file:bg-primary-dark"
                        />
                        {uploadingItemIndex === index && (
                          <p className="mt-1 text-[11px] text-muted">Uploading…</p>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <label className={labelClass}>Title</label>
                          <input
                            value={item.title}
                            onChange={(e) => updateItem(index, 'title', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Personalized Alignment"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Description</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            rows={2}
                            className={inputClass}
                            placeholder="Short description shown below the title"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>"Learn More" Link</label>
                          <input
                            value={item.link}
                            onChange={(e) => updateItem(index, 'link', e.target.value)}
                            className={inputClass}
                            placeholder="/courses"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
          {saved && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">Saved.</p>
          )}

          <div className="flex gap-3 border-t border-border pt-5">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}