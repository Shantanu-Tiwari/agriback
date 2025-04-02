import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SERVICE_KEY_SUPABASE;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials. Check your .env file.");
    process.exit(1); // Exit process if credentials are missing
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
