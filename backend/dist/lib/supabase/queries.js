"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = getEntries;
exports.createEntry = createEntry;
const client_1 = require("./client");
/**
 * Fetch all entries for the authenticated user
 */
async function getEntries() {
    const { data: { user }, } = await client_1.supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await client_1.supabase
        .from("entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
    if (error) {
        throw error;
    }
    return data || [];
}
/**
 * Create a new entry for the authenticated user
 */
async function createEntry(entry) {
    const { data: { user }, } = await client_1.supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await client_1.supabase
        .from("entries")
        .insert([
        {
            user_id: user.id,
            title: `Title är: ${entry.title}`,
            content: entry.content,
            created_at: new Date().toISOString(),
        },
    ])
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
}
