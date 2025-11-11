"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useEntriesStore } from "../../zustand/entiresStore";
import Header from "@/components/Header";

export default function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { entries, editEntry } = useEntriesStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    } else {
      fetchEntry();
    }
  }, [id, entries]);

  const fetchEntry = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/entries/${id}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to load entry");
      }

      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error("Error fetching entry:", error);
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/entries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }

      const data = await response.json();

      editEntry(id, {
        title: data.title,
        content: data.content,
        updatedAt: data.updatedAt,
      });

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to update entry");
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
            Edit Entry
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
              {loading ? "Saving..." : "Update Entry"}
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
