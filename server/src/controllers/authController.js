import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { checkIsMockDb } from '../config/db.js';

// In-Memory mock user store fallback when MongoDB is not connected
const mockUsers = [];

const generateToken = (id, email, name) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_change_in_production_32bytes';
  return jwt.sign({ id, email, name }, secret, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email and password' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    if (checkIsMockDb()) {
      const existing = mockUsers.find((u) => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, error: 'User already exists' });
      }

      const mockUser = {
        _id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        passwordHash,
        createdAt: new Date(),
      };
      mockUsers.push(mockUser);

      const token = generateToken(mockUser._id, mockUser.email, mockUser.name);
      return res.status(201).json({
        success: true,
        token,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email },
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    const token = generateToken(user._id, user.email, user.name);
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    if (checkIsMockDb()) {
      const user = mockUsers.find((u) => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.email, user.name);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.email, user.name);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
