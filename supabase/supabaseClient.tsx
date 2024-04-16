import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // Your Supabase project URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY; // Your Supabase project anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
