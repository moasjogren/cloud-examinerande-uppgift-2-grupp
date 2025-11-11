"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEntriesStore } from "../zustand/entiresStore";
import Header from "@/components/Header";

export default function NewEntryPage() {
  const router = useRouter();
  const addEntry = useEntriesStore((state) => state.addEntry);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/entries`,
          {
            credentials: "include",
          }
        );

        if (response.status === 401) {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, content, tags: tagsArray }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create entry");
      }
      const data = await response.json();

      const newEntry = {
        id: data._id || data.id,
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        userId: data.userId,
        createdAt: data.createdAt || data.created_at,
        updatedAt: data.updatedAt || data.updated_at,
      };

      addEntry(newEntry);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create entry");
      setLoading(false);
    }
  };

  const displayDate = new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="back-button text-warm-gray hover:text-dark-brown text-sm mb-4"
          >
            ← Back to entries
          </button>
          <h1 className="page-title text-3xl md:text-4xl font-serif text-dark-brown mb-2">
            New Entry
          </h1>
          <p className="text-warm-gray text-sm">{displayDate}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="form-label block text-sm mb-2 text-dark-brown font-medium"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-xl font-serif"
              placeholder="Give your entry a title..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="form-label block text-sm mb-2 text-dark-brown font-medium"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field min-h-[300px] md:min-h-[400px] resize-y leading-relaxed"
              placeholder="Write your thoughts..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="form-label block text-sm mb-2 text-dark-brown font-medium"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input-field"
              placeholder="Add tags separated by comma..."
              disabled={loading}
            />
            {tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag.length > 0)
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-warm-gray/20 px-3 py-1 mt-2 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Entry"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary w-full sm:w-auto"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
