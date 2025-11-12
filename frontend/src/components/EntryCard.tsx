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
    <div className="card">
      <div className="flex justify-between h-full w-full items-center">
        <div className="flex-col">
          <div className="mb-4">
            <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
              {formattedDate}
            </div>
            <h2 className="text-2xl font-serif text-dark-brown [html.dark_&]:text-cream mb-3">
              {entry.title}
            </h2>
          </div>
          <p className="text-dark-brown/80 [html.dark_&]:text-cream/80 leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </p>
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {entry.tags
                .filter((tag) => tag.length > 0)
                .map((tag, index) => (
                  <span
                    key={`${entry.id}-tag-${index}`}
                    className="inline-block bg-dark-brown/80 px-3 py-1 mt-2 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
          <EntryReactions entryId={entry.id} />
        </div>
        <div className="flex gap-5 mt-5 h-10">
          <button onClick={handleEdit} className="btn-primary w-full sm:w-auto">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn-primary w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
