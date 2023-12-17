import express from "express";
import router from "./routes.js"
import { cors } from './middleware/cors.js';
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
const server = express();

server.use(express.json());
server.use(morgan('tiny'));
server.use(cors);
server.use(router);

server.listen(3000, () => {
    console.log("Server rodando na porta 3000");
});