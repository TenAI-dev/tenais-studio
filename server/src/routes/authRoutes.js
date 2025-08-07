// src/routes/authRoutes.js
import express from 'express';
import { loginWithEmail, loginWithOAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/email', loginWithEmail);
router.get('/oauth', loginWithOAuth); // using query param instead of route param

export default router;
