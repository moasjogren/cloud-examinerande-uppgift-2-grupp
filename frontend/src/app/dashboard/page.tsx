"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import { useEntriesStore } from "../zustand/entiresStore";
import SemanticSearchBar from "@/components/Search";


export default function DashboardPage() {
  const { entries, loading, error, fetchEntries } = useEntriesStore();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  const displayEntries = isSearching ? searchResults : entries;

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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

        <div className="mb-8">
          <SemanticSearchBar onResults={handleSearchResults} />
        </div>

        {isSearching && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-warm-gray">
              Found {searchResults.length} relevant{" "}
              {searchResults.length === 1 ? "entry" : "entries"}
            </p>
            <button
              onClick={handleClearSearch}
              className="text-sm text-dark-brown hover:underline"
            >
              Show all entries
            </button>
          </div>
        )}

        {displayEntries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-6">
              {isSearching
                ? "No entries found matching your search."
                : "You haven't written any entries yet."}
            </p>
            {!isSearching && (
              <Link href="/new-entry">
                <button className="btn-secondary">
                  Write your first entry
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {displayEntries.map((entry) => (
              <div key={entry.id || entry._id}>
                <EntryCard entry={entry} />
                {entry.relevanceScore && (
                  <div className="mt-2 text-xs text-warm-gray">
                    Relevance: {Math.round(entry.relevanceScore * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
