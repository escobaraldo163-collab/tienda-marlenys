const SUPABASE_URL = "https://cvauyuqlxclpzifbytuw.supabase.co";
const SUPABASE_KEY = "sb_publishable_JVpfQx9Ozg-GmeSr-NeDyA_QM0tEa4i";

window.marlenysSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);