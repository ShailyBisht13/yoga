import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';

const emptyForm = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  published: true,
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
    'w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-secondary';

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-dark">Blog Posts</h1>
        {!editing && (
          <button
            onClick={startNew}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
          >
            + New Post
          </button>
        )}
      </div>

      {editing && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-white p-6"
        >
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
              Title
            </label>
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
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
              Slug (URL)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={handleSlugChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
              Content (separate paragraphs with a blank line)
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
              Cover Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
            {uploading && <p className="mt-1 text-xs text-muted">Uploading…</p>}
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Cover preview"
                className="mt-3 h-32 w-auto rounded-lg object-cover"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
            Published (visible on the site)
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Post'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!editing && (
        <div className="mt-6 flex flex-col gap-3">
          {loading && <p className="text-muted">Loading…</p>}
          {!loading && posts.length === 0 && <p className="text-muted">No posts yet.</p>}
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between rounded-2xl border border-border bg-white p-4"
            >
              <div className="flex items-center gap-4">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-dark">{post.title}</p>
                  <p className="text-xs text-muted">
                    /{post.slug} ·{' '}
                    <span className={post.published ? 'text-green-600' : 'text-yellow-600'}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <button onClick={() => startEdit(post)} className="text-secondary hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
