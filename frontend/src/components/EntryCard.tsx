import { useRouter } from "next/navigation";
import { useEntriesStore } from "@/app/zustand/entiresStore";
import { Entry } from "../app/types/EntryTypes";
import { EntryReactions } from "./EntryReactions";

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const router = useRouter();
  const deleteEntry = useEntriesStore((state) => state.deleteEntry);

  function handleEdit() {
    router.push(`/edit-entry/${entry.id}`);
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/entries/${entry.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      deleteEntry(entry.id);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }

  const formattedDate = new Date(entry.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="card relative">
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <button
          onClick={handleEdit}
          className="icon-btn"
          aria-label="Edit entry"
          title="Edit entry"
        >
          <span className="text-lg">✏️</span>
        </button>
        <button
          onClick={handleDelete}
          className="icon-btn"
          aria-label="Delete entry"
          title="Delete entry"
        >
          <span className="text-lg">🗑️</span>
        </button>
      </div>
      <div className="absolute bottom-4 right-4">
        <EntryReactions entryId={entry.id} />
      </div>
      <div className="flex flex-col gap-4 pr-20 sm:pr-24 pb-12 sm:pb-16">
        <div className="flex-1">
          <div className="mb-4">
            <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
              {formattedDate}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-dark-brown [html.dark_&]:text-cream mb-3">
              {entry.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-dark-brown/80 [html.dark_&]:text-cream/80 leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </p>
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {entry.tags
                .filter((tag) => tag.length > 0)
                .map((tag, index) => (
                  <span key={`${entry.id}-tag-${index}`} className="tags">
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
