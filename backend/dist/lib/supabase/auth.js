"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = signUp;
exports.signIn = signIn;
exports.signOut = signOut;
exports.getCurrentUser = getCurrentUser;
const client_1 = require("./client");
/**
 * Sign up a new user with email and password
 */
async function signUp({ email, password }) {
    const { data, error } = await client_1.supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return data;
}
/**
 * Sign in an existing user with email and password
 */
async function signIn({ email, password }) {
    const { data, error } = await client_1.supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return data;
}
/**
 * Sign out the current user
 */
async function signOut() {
    const { error } = await client_1.supabase.auth.signOut();
    if (error) {
        throw error;
    }
}
/**
 * Get the current authenticated user
 */
async function getCurrentUser() {
    const { data: { user }, } = await client_1.supabase.auth.getUser();
    return user;
}
