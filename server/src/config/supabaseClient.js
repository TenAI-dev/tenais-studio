// src/config/supabaseClient.js
import dotenv from 'dotenv';
dotenv.config(); // 👈 ensure this is at the top

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
