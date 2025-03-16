import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseURL = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const secretRoleKey = process.env.SECRET_ROLE_KEY as string;

const supabaseAdmin = createClient(
    supabaseURL,
    secretRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
);

export default supabaseAdmin
  