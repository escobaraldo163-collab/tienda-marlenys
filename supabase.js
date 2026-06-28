const SUPABASE_URL = "https://cvauyuqlxclpzifbytuw.supabase.co";
const SUPABASE_KEY = "sb_publishable_JVpfQx90zg-GmeSr-NeDyA_QM0tEa4i";

window.SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_KEY,
  storageBucket: "productos"
};

window.marlenysSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);