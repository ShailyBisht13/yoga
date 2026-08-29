import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import {
  LuHouse,
  LuDumbbell,
  LuHeartPulse,
  LuUsers,
  LuSparkles,
  LuNewspaper,
  LuImage,
  LuCircleHelp,
  LuPlus,
  LuTrash2,
} from 'react-icons/lu';

const sections = [
  { key: 'hero', label: 'Hero Section', icon: LuHouse },
  { key: 'training', label: 'Training', icon: LuDumbbell },
  { key: 'therapy', label: 'Therapy', icon: LuHeartPulse },
  { key: 'classes', label: 'Classes', icon: LuUsers },
  { key: 'programs', label: 'Programs', icon: LuSparkles },
  { key: 'blogs', label: 'Blogs', icon: LuNewspaper },
  { key: 'gallery', label: 'Gallery', icon: LuImage },
  { key: 'faq', label: 'FAQ', icon: LuCircleHelp },
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

const EMPTY_ITEM = {
  title: '',
  description: '',
  image: '',
  link: '',
  duration: '',
  difficulty: '',
  category: '',
  date: '',
  readTime: '',
};

// Sections that show a fixed-count card grid on the homepage
const SECTIONS_WITH_ITEMS = ['training', 'therapy', 'classes', 'programs', 'blogs', 'gallery'];
// How many cards each of those sections has
const ITEM_COUNTS = { training: 3, therapy: 3, classes: 3, programs: 6, blogs: 3, gallery: 9 };
// Only Programs cards use duration / difficulty
const SECTIONS_WITH_DIFFICULTY = ['programs'];
const DIFFICULTY_OPTIONS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Therapeutic',
  'All Levels',
  'Professional',
];
// Blogs cards use category / date / read time instead of duration+difficulty
const SECTIONS_WITH_BLOG_META = ['blogs'];
const BLOG_CATEGORY_OPTIONS = ['Yoga', 'Meditation', 'Lifestyle'];
// Gallery cards use a category filter tag instead
const SECTIONS_WITH_GALLERY_META = ['gallery'];
const GALLERY_CATEGORY_OPTIONS = [
  'Yoga Classes',
  'Meditation',
  'Teacher Training',
  'Events',
  'Workshops',
];
// Sections with a single admin-editable top image (not a per-card image)
const SECTIONS_WITH_IMAGE = ['hero', 'faq'];
// FAQ has a variable-length list of Q&A pairs instead of a fixed card count
const DYNAMIC_ITEM_SECTIONS = ['faq'];

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

    if (DYNAMIC_ITEM_SECTIONS.includes(key)) {
      api
        .getSiteContent(key)
        .then((data) => {
          const savedItems = data?.items || [];
          setForm({
            ...emptySection,
            ...data,
            features: data?.features || [],
            items: savedItems.length
              ? savedItems.map((it) => ({ ...EMPTY_ITEM, ...it }))
              : [{ ...EMPTY_ITEM }],
          });
        })
        .catch(() => setForm({ ...emptySection, items: [{ ...EMPTY_ITEM }] }))
        .finally(() => setLoading(false));
      return;
    }

    const count = ITEM_COUNTS[key] || 3;
    api
      .getSiteContent(key)
      .then((data) => {
        const savedItems = data?.items || [];
        const paddedItems = Array.from({ length: count }, (_, i) => ({
          ...EMPTY_ITEM,
          ...savedItems[i],
        }));
        setForm({
          ...emptySection,
          ...data,
          features: data?.features || [],
          items: paddedItems,
        });
      })
      .catch(() =>
        setForm({
          ...emptySection,
          items: Array.from({ length: count }, () => ({ ...EMPTY_ITEM })),
        })
      )
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

  const addDynamicItem = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...EMPTY_ITEM }] }));
    setSaved(false);
  };

  const removeDynamicItem = (index) => {
    setForm((prev) => ({ ...prev, items: prev.items.filter((_, idx) => idx !== index) }));
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
      if (DYNAMIC_ITEM_SECTIONS.includes(active)) {
        payload.items = form.items.filter(
          (item) => item.title.trim() || item.description.trim()
        );
      } else if (SECTIONS_WITH_ITEMS.includes(active)) {
        payload.items = form.items;
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

  const cardsHelperText = () => {
    if (active === 'gallery') return 'These are the photos shown in the homepage gallery grid.';
    if (active === 'blogs') return 'These are the blog cards shown on the homepage.';
    return 'These are the photo cards displayed for this section on the homepage.';
  };

  return (
    <AdminShell
      eyebrow="Site Content"
      title="Page Content"
      subtitle="Edit the text and images shown across the homepage sections."
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
        <p className="text-sm text-muted">Loadingâ€¦</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-7 shadow-soft"
        >
          {active === 'hero' && (
            <>
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
            </>
          )}

          {SECTIONS_WITH_IMAGE.includes(active) && (
            <div>
              <label className={labelClass}>
                {active === 'faq' ? 'FAQ Photo' : 'Image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-primary-dark"
              />
              {uploading && <p className="mt-2 text-xs text-muted">Uploadingâ€¦</p>}
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-3 h-36 w-auto rounded-lg border border-border object-cover"
                />
              )}
            </div>
          )}

          {active === 'hero' && (
            <>
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
            </>
          )}

          {DYNAMIC_ITEM_SECTIONS.includes(active) && (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className={labelClass}>Questions & Answers ({form.items.length})</label>
                <button
                  type="button"
                  onClick={addDynamicItem}
                  className="flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                >
                  <LuPlus className="h-3.5 w-3.5" />
                  Add Question
                </button>
              </div>
              <p className="mb-3 text-xs text-muted">
                These appear as the accordion list on the homepage FAQ section.
              </p>
              <div className="flex flex-col gap-4">
                {form.items.map((item, index) => (
                  <div key={index} className="rounded-xl border border-border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Question {index + 1}
                      </p>
                      {form.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDynamicItem(index)}
                          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove question"
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>Question</label>
                        <input
                          value={item.title}
                          onChange={(e) => updateItem(index, 'title', e.target.value)}
                          className={inputClass}
                          placeholder="e.g. Do I need prior yoga experience?"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Answer</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          rows={3}
                          className={inputClass}
                          placeholder="Answer shown when this question is expanded"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {SECTIONS_WITH_ITEMS.includes(active) && (
            <div>
              <label className={labelClass}>
                {active === 'gallery' ? 'Gallery Photos' : 'Section Cards'} ({form.items.length})
              </label>
              <p className="mb-3 text-xs text-muted">{cardsHelperText()}</p>
              <div className="flex flex-col gap-4">
                {form.items.map((item, index) => (
                  <div key={index} className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      {active === 'gallery' ? `Photo ${index + 1}` : `Card ${index + 1}`}
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
                          <p className="mt-1 text-[11px] text-muted">Uploadingâ€¦</p>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <label className={labelClass}>Title</label>
                          <input
                            value={item.title}
                            onChange={(e) => updateItem(index, 'title', e.target.value)}
                            className={inputClass}
                            placeholder={active === 'gallery' ? 'e.g. Hatha Yoga Session' : 'e.g. Personalized Alignment'}
                          />
                        </div>

                        {active !== 'gallery' && (
                          <div>
                            <label className={labelClass}>
                              {active === 'blogs' ? 'Excerpt' : 'Description'}
                            </label>
                            <textarea
                              value={item.description}
                              onChange={(e) => updateItem(index, 'description', e.target.value)}
                              rows={2}
                              className={inputClass}
                              placeholder="Short description shown below the title"
                            />
                          </div>
                        )}

                        {SECTIONS_WITH_DIFFICULTY.includes(active) && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label className={labelClass}>Duration</label>
                              <input
                                value={item.duration}
                                onChange={(e) => updateItem(index, 'duration', e.target.value)}
                                className={inputClass}
                                placeholder="e.g. 60 min"
                              />
                            </div>
                            <div>
                              <label className={labelClass}>Difficulty Badge</label>
                              <select
                                value={item.difficulty}
                                onChange={(e) => updateItem(index, 'difficulty', e.target.value)}
                                className={inputClass}
                              >
                                <option value="">Selectâ€¦</option>
                                {DIFFICULTY_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {SECTIONS_WITH_BLOG_META.includes(active) && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div>
                              <label className={labelClass}>Category</label>
                              <select
                                value={item.category}
                                onChange={(e) => updateItem(index, 'category', e.target.value)}
                                className={inputClass}
                              >
                                <option value="">Selectâ€¦</option>
                                {BLOG_CATEGORY_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Date</label>
                              <input
                                value={item.date}
                                onChange={(e) => updateItem(index, 'date', e.target.value)}
                                className={inputClass}
                                placeholder="e.g. July 15, 2026"
                              />
                            </div>
                            <div>
                              <label className={labelClass}>Read Time</label>
                              <input
                                value={item.readTime}
                                onChange={(e) => updateItem(index, 'readTime', e.target.value)}
                                className={inputClass}
                                placeholder="e.g. 5 min"
                              />
                            </div>
                          </div>
                        )}

                        {SECTIONS_WITH_GALLERY_META.includes(active) && (
                          <div>
                            <label className={labelClass}>Category (filter tag)</label>
                            <select
                              value={item.category}
                              onChange={(e) => updateItem(index, 'category', e.target.value)}
                              className={inputClass}
                            >
                              <option value="">Selectâ€¦</option>
                              {GALLERY_CATEGORY_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div>
                          <label className={labelClass}>
                            {active === 'gallery' ? 'Link (optional)' : '"Learn More" Link'}
                          </label>
                          <input
                            value={item.link}
                            onChange={(e) => updateItem(index, 'link', e.target.value)}
                            className={inputClass}
                            placeholder="/classes"
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
              {saving ? 'Savingâ€¦' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
