import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseURL = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const secretRoleKey = process.env.SECRET_ROLE_KEY as string;
const db = createClient(supabaseURL, supabaseKey);

const supabaseAdmin = createClient(
    supabaseURL,
    supabaseKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
);
  


export default db;
