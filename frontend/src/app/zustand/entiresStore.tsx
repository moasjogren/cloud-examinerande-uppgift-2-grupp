import { create } from "zustand";
import { Entry } from "../types/EntryTypes";

interface EntriesState {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  setEntries: (entries: Entry[]) => void;
  addEntry: (entry: Entry) => void;
  editEntry: (entryId: string, updatedEntry: Partial<Entry>) => void;
  deleteEntry: (entryId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchEntries: () => Promise<void>;
}

export const useEntriesStore = create<EntriesState>((set) => ({
  entries: [],
  loading: false,
  error: null,

  setEntries: (entries) => set({ entries }),

  addEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, entry] as Entry[],
    })),

  editEntry: (entryId, updatedEntry) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  deleteEntry: (entryId) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== entryId),
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  fetchEntries: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/entries`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to load entries");
      }

      const entriesData = await response.json();

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
        set({ entries: mappedEntries, loading: false });
      } else {
        set({ entries: [], loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
