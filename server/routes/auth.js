import express from 'express';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Validate credentials with Firebase Auth
    // For now, accept any email/password combination in development
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const token = generateToken(email, email);
    res.json({
      token,
      user: {
        email,
        userId: email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register endpoint
router.post('/register', (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Create user with Firebase Auth
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const token = generateToken(email, email);
    res.json({
      token,
      user: {
        email,
        userId: email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  res.json({ valid: true });
});

export default router;
