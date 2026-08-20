import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import { LuNewspaper, LuPencil, LuPlus, LuTrash2 } from 'react-icons/lu';

const emptyForm = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  published: false,
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = () => {
    setLoading(true);
    api
      .getAllPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !prev._slugEdited) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setForm((prev) => ({ ...prev, slug: slugify(e.target.value), _slugEdited: true }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const { url } = await api.uploadBlogImage(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    }
    setUploading(false);
  };

  const startEdit = (post) => {
    setForm({ ...emptyForm, ...post, id: post._id, _slugEdited: true });
    setEditing(true);
  };

  const startNew = () => {
    setForm(emptyForm);
    setEditing(true);
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditing(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      published: form.published,
    };

    try {
      if (form.id) {
        await api.updatePost(form.id, payload);
      } else {
        await api.createPost(payload);
      }
      cancelEdit();
      fetchPosts();
    } catch (err) {
      setError(err.message || 'Save failed.');
    }
    setSaving(false);
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this post?')) return;
    setPosts((prev) => prev.filter((p) => p._id !== id));
    try {
      await api.deletePost(id);
    } catch {
      fetchPosts();
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary';
  const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted';

  return (
    <AdminShell
      eyebrow="Blog"
      title="Blog Posts"
      subtitle={`${posts.length} post${posts.length === 1 ? '' : 's'} total`}
      actions={
        !editing && (
          <button
            onClick={startNew}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <LuPlus className="h-4 w-4" />
            New Post
          </button>
        )
      }
    >
      {editing && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-7 shadow-soft"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-heading text-lg font-semibold text-dark">
              {form.id ? 'Edit Post' : 'New Post'}
            </h2>
          </div>

          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={handleSlugChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Content (separate paragraphs with a blank line)</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-primary-dark"
            />
            {uploading && <p className="mt-2 text-xs text-muted">Uploading…</p>}
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Cover preview"
                className="mt-3 h-32 w-auto rounded-lg border border-border object-cover"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-dark">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Published (visible on the site)
          </label>

          {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 border-t border-border pt-5">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Post'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-[#FBF8F2]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!editing && (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          {loading && <p className="p-8 text-sm text-muted">Loading posts…</p>}

          {!loading && posts.length === 0 && (
            <div className="flex flex-col items-center gap-3 p-16 text-center">
              <LuNewspaper className="h-8 w-8 text-secondary-light" />
              <div>
                <p className="font-medium text-dark">No posts yet</p>
                <p className="mt-1 text-sm text-muted">Create your first post to see it here.</p>
              </div>
            </div>
          )}

          {posts.map((post, i) => (
            <div
              key={post._id}
              className={`flex items-center justify-between gap-4 p-5 hover:bg-[#FBF8F2]/60 ${
                i !== posts.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex min-w-0 items-center gap-4">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-[#FBF8F2]">
                    <LuNewspaper className="h-5 w-5 text-secondary-light" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium text-dark">{post.title}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    /{post.slug} ·{' '}
                    <span
                      className={`font-medium ${
                        post.published ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => startEdit(post)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary/10"
                >
                  <LuPencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete post"
                >
                  <LuTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
