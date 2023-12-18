import express from "express";
import User from "./models/User.js";
import Ip from "./models/Ip.js";
import bcrypt from 'bcrypt';
import { isAuthenticated } from './middleware/auth.js';
import jwt from 'jsonwebtoken';
import json from 'body-parser';
import { exec } from 'child_process';

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
    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.SECRET,
        { expiresIn: 3600 } 
      );
      res.json({auth: true, token});
    } else {
      console.log("Erro");
    }
  } catch {
    console.log("Usuario não encontrado");
  }
});

router.get("/ips/:token", isAuthenticated, async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const Ips = await Ip.read(decoded.id);
    res.json(Ips);
});

router.post("/ips/", isAuthenticated, async (req, res) => {
    const token = req.body.token;
    const address = req.body.address;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;
    const ip = {
      address: address,
      userId: userId
    }
    const newIp = await Ip.create(ip);
    res.json(newIp);
});

router.get("/user/:token", isAuthenticated, async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;
    res.json(userId);
});

router.post('/scp', (req, res) => {
  const { passwd, destination, options } = req.body;

  // Execute o comando SCP
  const scpCommand = `sshpass -p ${passwd} scp ${options || ''} ${destination} ./arquivos`;

  exec(scpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(error.message);
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    res.status(200).send(stdout || stderr);
  });
});

export default router;