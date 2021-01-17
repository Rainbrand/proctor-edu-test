import express from "express";
import { v4 as uuidv4 } from 'uuid';
import JWTGenerator from "../jwtHandler.js"


const apiTokenRouter = express.Router()

apiTokenRouter.post('/token', (req, res) => {
    const username = req.username
    const jwt = new JWTGenerator()
    const token = jwt.generate({
        username: username,
        id: uuidv4()
    })
    res.send({token}).status(201)
})

export default apiTokenRouter
