const SUPABASE_URL = "https://cvauyuqlxclpzifbytuw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YXV5dXFseGNscHppZmJ5dHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MTExMTIsImV4cCI6MjA5ODE4NzExMn0.l5wpHDS19WgeEQtYyM7w4GpnPRUYnViOjEgj7I_TEE4";

window.SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_KEY,
  storageBucket: "productos"
};

window.marlenysSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);