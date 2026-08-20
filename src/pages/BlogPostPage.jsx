import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Container } from '@/components/ui';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .getPublishedPostBySlug(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <Container className="max-w-[800px] py-24 text-center text-muted">Loading…</Container>;
  }

  if (notFound || !post) {
    return (
      <Container className="max-w-[800px] py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold text-dark">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-secondary underline">
          Back to Blog
        </Link>
      </Container>
    );
  }

  const paragraphs = (post.content || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="py-16">
      <Container className="max-w-[800px]">
        <Link to="/blog" className="text-sm text-secondary hover:underline">
          ← Back to Blog
        </Link>

        <h1 className="mt-4 font-heading text-3xl font-semibold text-dark md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-8 h-auto w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose mt-8 max-w-none">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-5 leading-relaxed text-dark/90">
              {p}
            </p>
          ))}
        </div>
      </Container>
    </article>
  );
}
