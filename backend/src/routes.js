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


export default router;