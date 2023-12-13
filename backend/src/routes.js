import express from "express";
import User from "./models/User.js";

const router = express.Router();

router.post("/registro", (req, res) => {
    const user = req.body;
    const newUser = User.create(user);
    if (newUser){
        res.json(newHost);
    }
});

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
    
        const { id: userId, password: hash } = await User.readByUsername(username);
    
        const match = await bcrypt.compare(password, hash);
    
        if (match) {
          const token = jwt.sign(
            { userId },
            process.env.SECRET,
            { expiresIn: 3600 } // 1h
          );
    
          res.json({ auth: true, token });
        } else {
          throw new Error('User not found');
        }
    } catch (error) {
        res.status(401).json({ error: 'User not found' });
    }
});

export default router;