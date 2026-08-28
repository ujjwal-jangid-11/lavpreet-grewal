import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

console.log("SUPABASE CLIENT LOADED");
console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("KEY EXISTS:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);