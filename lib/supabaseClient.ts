import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read Supabase credentials from environment variables provided by Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

// Check if the environment variables are set
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error('Supabase credentials are not set. Please create a .env file in the root directory and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    // Provide a mock client in case credentials are not set, to avoid crashing the app.
    // Functions will not work, but the UI can render.
    supabase = {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
            insert: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
            update: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
            delete: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
        }),
        auth: {
            // Mock auth methods needed by AuthContext
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
            signOut: () => Promise.resolve({ error: null }),
        }
    } as any;
}


export { supabase };