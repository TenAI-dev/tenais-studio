import dotenv from 'dotenv';
dotenv.config(); // Load env vars first
console.log("Loaded SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("Loaded SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));