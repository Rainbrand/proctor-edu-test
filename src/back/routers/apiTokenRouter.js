import express from "express";
import { v4 as uuidv4 } from 'uuid';
import JWTGenerator from "../jwtHandler.js"


const apiTokenRouter = express.Router()

apiTokenRouter.post('/login', (req, res) => {
    const username = req.body.username
    const jwt = new JWTGenerator()
    const token = jwt.generate({
        username: username
    })
    res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000)})
    res.status(201)
    res.send()
})

apiTokenRouter.post('/token', (req, res) => {
    const username = req.body.username
    const jwt = new JWTGenerator()
    const sessionID = uuidv4()
    const token = jwt.generate({
        username: username,
        id: sessionID
    })
    res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000)})
    res.cookie('sessionID', sessionID)
    res.status(201)
    res.send()
})

export default apiTokenRouter
