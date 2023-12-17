import express from "express";
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import { isAuthenticated } from './middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/registro", async (req, res) => {
    const user = req.body;
    res.json(await User.create(user));
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { id: userId, password: hash } = await User.readByUsername(username);
    const match = await bcrypt.compare(password, hash);
    res.json(match);
  } catch {
    console.log("Usuario não encontrado");
  }
});

export default router;