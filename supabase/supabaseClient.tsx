import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "your-supabase-url"; // Your Supabase project URL
const supabaseAnonKey = "your-supabase-anon-key"; // Your Supabase project anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
