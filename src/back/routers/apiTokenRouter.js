import express from "express";
import JWTGenerator from "../jwtHandler.js"

const apiTokenRouter = express.Router()

apiTokenRouter.post('/token', (req, res) => {
    const username = req.username
    const jwt = new JWTGenerator()
    const token = jwt.generate({username: username})
    res.send({token}).status(201)
})

export default apiTokenRouter
