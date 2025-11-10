"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
// import { getEntries } from '@/lib/supabase/queries'
// import { getCurrentUser } from '@/lib/supabase/auth'
import { Entry } from "../types/EntryTypes";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Get entries for the authenticated user
        const entriesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/entries`,
          {
            credentials: "include",
          }
        );

        if (entriesResponse.status === 401) {
          router.push("/login");
          return;
        }

        if (!entriesResponse.ok) {
          throw new Error("Failed to load entries");
        }

        const entriesData = await entriesResponse.json();

        if (Array.isArray(entriesData)) {
          const mappedEntries = entriesData.map((entry: any) => ({
            id: entry._id || entry.id,
            title: entry.title,
            content: entry.content,
            tags: entry.tags || [],
            userId: entry.userId,
            createdAt: entry.createdAt || entry.created_at,
            updatedAt: entry.updatedAt || entry.updated_at,
          }));
          setEntries(mappedEntries);
        } else {
          setEntries([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load entries");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-warm-gray text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 md:px-8 lg:px-20 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="page-title text-2xl md:text-3xl font-serif text-dark-brown mb-2">
              Your Entries
            </h2>
            <p className="text-warm-gray text-sm">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <Link href="/new-entry">
            <button className="btn-primary w-full sm:w-auto">New Entry</button>
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-6">
              You haven't written any entries yet.
            </p>
            <Link href="/new-entry">
              <button className="btn-secondary">Write your first entry</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
