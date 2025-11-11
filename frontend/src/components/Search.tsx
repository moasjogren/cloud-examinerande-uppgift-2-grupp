"use client";

import { useState } from "react";

interface SearchResult {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  relevanceScore: number;
}

interface SemanticSearchBarProps {
  onResults: (results: SearchResult[]) => void;
}

export default function SemanticSearchBar({
  onResults,
}: SemanticSearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      onResults([]); // Clear results if query is empty
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("query", query);
      params.append("threshold", "0.3"); // Fixed threshold

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/semantic?${params}`,
        { credentials: "include" }
      );

      if (response.ok) {
        const results = await response.json();
        onResults(results);
      } else {
        console.error("Search failed");
        onResults([]);
      }
    } catch (error) {
      console.error("Error during search:", error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    onResults([]);
  };

  return (
    <div className="card">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your entries..."
          className="input-field flex-1"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="btn-primary"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {query && (
          <button
            onClick={handleClear}
            className="btn-secondary"
            disabled={loading}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
