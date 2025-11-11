"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import { useEntriesStore } from "../zustand/entiresStore";

export default function DashboardPage() {
  const { entries, loading, error, fetchEntries } = useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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
