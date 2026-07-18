"use client";

import { useEffect, useState } from "react";
import {
  addPost,
  deleteComment,
  deletePost,
  setCommentApproved,
  slugify,
  subscribeAllComments,
  subscribePosts,
  updatePost,
  uploadCoverImage,
  type BlogComment,
  type BlogPost,
} from "@/lib/firestore/blog";
import { subscribeCategories, type Tag } from "@/lib/firestore/taxonomy";

const TABS = ["All Posts", "Add Post", "Comments"] as const;
export type BlogTab = (typeof TABS)[number];

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

function AllPostsTab({
  posts,
  onEdit,
  onDelete,
}: {
  posts: BlogPost[];
  onEdit: (p: BlogPost) => void;
  onDelete: (p: BlogPost) => void;
}) {
  if (posts.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        No blog posts yet. Click &quot;Add Post&quot; above to write your first one.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {posts.map((p) => (
        <li
          key={p.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-white">{p.title}</p>
            <p className="text-xs text-muted">
              /blog/{p.slug} ·{" "}
              <span className={p.published ? "text-emerald-400" : "text-amber-400"}>
                {p.published ? "Published" : "Draft"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(p)} className="text-xs font-semibold text-gold hover:underline">
              Edit
            </button>
            <button onClick={() => onDelete(p)} className="text-xs font-semibold text-rose-400 hover:underline">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AddPostForm({ editingPost, onDone }: { editingPost: BlogPost | null; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const unsub = subscribeCategories(setTags);
    return () => unsub?.();
  }, []);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setSlug(editingPost.slug);
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setCoverImageUrl(editingPost.coverImageUrl);
      setSelectedTags(editingPost.tags);
      setPublished(editingPost.published);
      setSlugTouched(true);
    } else {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImageUrl("");
      setCoverFile(null);
      setSelectedTags([]);
      setPublished(true);
      setSlugTouched(false);
    }
  }, [editingPost]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setSaving(true);
    setError(null);
    try {
      let finalCoverUrl = coverImageUrl;
      const id = editingPost?.id ?? crypto.randomUUID();
      if (coverFile) {
        finalCoverUrl = await uploadCoverImage(id, coverFile);
      }
      const input = {
        title: title.trim(),
        slug: slugify(slug),
        excerpt: excerpt.trim(),
        content,
        coverImageUrl: finalCoverUrl,
        tags: selectedTags,
        published,
      };
      if (editingPost) {
        await updatePost(editingPost.id, input);
      } else {
        await addPost(input);
      }
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this post.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Post Title</label>
        <input
          type="text"
          required
          placeholder="e.g. 5 Web Design Trends for 2026"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          URL Slug — visitors will see it at /blog/{slug || "your-slug"}
        </label>
        <input
          type="text"
          required
          placeholder="5-web-design-trends-2026"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Excerpt (short summary)</label>
        <textarea
          rows={2}
          placeholder="One or two sentences shown on the blog list page"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Cover Image</label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
          className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-gold-gradient file:px-3 file:py-2 file:text-xs file:font-semibold file:text-bg"
        />
        {coverImageUrl && !coverFile && (
          <p className="mt-1 text-[11px] text-muted">A cover image is already set — choose a file to replace it.</p>
        )}
      </div>
      {tags.length > 0 && (
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Tags</label>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const isOn = selectedTags.includes(tag.name);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() =>
                    setSelectedTags((prev) =>
                      isOn ? prev.filter((t) => t !== tag.name) : [...prev, tag.name]
                    )
                  }
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    isOn ? "border-gold bg-gold/15 text-gold" : "border-line text-muted hover:text-white"
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Content</label>
        <textarea
          rows={12}
          required
          placeholder="Write your post here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-line accent-gold"
        />
        Published (visible to visitors)
      </label>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-60">
          {saving ? "Saving…" : editingPost ? "Save Changes" : "Publish Post"}
        </button>
        {editingPost && (
          <button type="button" onClick={onDone} className="btn-outline justify-center">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function CommentsTab({ posts }: { posts: BlogPost[] }) {
  const [comments, setComments] = useState<BlogComment[]>([]);

  useEffect(() => {
    const unsub = subscribeAllComments(setComments);
    return () => unsub?.();
  }, []);

  if (comments.length === 0) {
    return <p className="py-10 text-center text-sm text-muted">No comments yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {comments.map((c) => {
        const post = posts.find((p) => p.id === c.postId);
        return (
          <li key={c.id} className="rounded-lg border border-line p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {c.name} <span className="font-normal text-muted">on {post?.title ?? "a post"}</span>
                </p>
                <p className="mt-1 text-xs text-muted">{c.comment}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  c.approved ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                }`}
              >
                {c.approved ? "Approved" : "Pending"}
              </span>
            </div>
            <div className="mt-3 flex gap-3">
              {!c.approved && (
                <button
                  onClick={() => setCommentApproved(c.id, true)}
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Approve
                </button>
              )}
              {c.approved && (
                <button
                  onClick={() => setCommentApproved(c.id, false)}
                  className="text-xs font-semibold text-amber-400 hover:underline"
                >
                  Unapprove
                </button>
              )}
              <button
                onClick={() => confirm("Delete this comment?") && deleteComment(c.id)}
                className="text-xs font-semibold text-rose-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function AdminBlogCard({
  activeTab,
  onTabChange,
  initialEditId,
}: {
  activeTab: BlogTab;
  onTabChange: (t: BlogTab) => void;
  initialEditId?: string | null;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsub = subscribePosts(setPosts);
    return () => unsub?.();
  }, []);

  // If a specific post id was passed in via the URL (e.g. navigating to
  // /admin/blog/add?edit=<id>), pre-select it for editing once the posts
  // list has loaded. Runs again whenever posts changes, so it still works
  // even if this component mounts before the Firestore subscription
  // delivers its first snapshot.
  useEffect(() => {
    if (!initialEditId) return;
    const match = posts.find((p) => p.id === initialEditId);
    if (match) setEditingPost(match);
  }, [initialEditId, posts]);

  async function handleDelete(post: BlogPost) {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    try {
      await deletePost(post.id);
    } catch {
      alert("Couldn't delete this post. Please try again.");
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-blog">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Manage <span className="text-gold">Blog</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">Published at /blog.</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-b border-line pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => {
              onTabChange(t);
              if (t !== "Add Post") setEditingPost(null);
            }}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === t ? "bg-gold-gradient text-bg" : "border border-line text-muted hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "All Posts" && (
          <AllPostsTab
            posts={posts}
            onEdit={(p) => {
              setEditingPost(p);
              onTabChange("Add Post");
            }}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "Add Post" && (
          <AddPostForm
            editingPost={editingPost}
            onDone={() => {
              setEditingPost(null);
              onTabChange("All Posts");
            }}
          />
        )}
        {activeTab === "Comments" && <CommentsTab posts={posts} />}
      </div>
    </div>
  );
}