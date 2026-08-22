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
};

export default function AdminContentPage() {
  const [active, setActive] = useState('hero');
  const [form, setForm] = useState(emptySection);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const loadSection = (key) => {
    setLoading(true);
    setSaved(false);
    setError('');
    api
      .getSiteContent(key)
      .then((data) => setForm({ ...emptySection, ...data, features: data?.features || [] }))
      .catch(() => setForm(emptySection))
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