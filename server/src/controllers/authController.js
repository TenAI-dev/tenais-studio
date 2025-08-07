// src/controllers/authController.js
import { supabase } from '../config/supabaseClient.js';

export const loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
};

export const loginWithOAuth = async (req, res) => {
  const { provider } = req.query;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'tenaiv1://auth/callback', // for mobile
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ url: data.url });
};
