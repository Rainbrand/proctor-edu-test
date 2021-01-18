import express from "express";
import {v4 as uuidv4} from 'uuid';
import JWTGenerator from "../jwtHandler.js"

const apiSessionTokenRouter = express.Router()

const getToken = payload => {
    const jwt = new JWTGenerator()
    return jwt.generate({
        payload
    })
}

apiSessionTokenRouter.post('/sesstoken', (req, res) => {
    const sessionID = uuidv4()
    const token = getToken({username: req.body.username, id: sessionID})
    res.cookie('token', `Bearer ${token}`, {expires: new Date(Date.now() + 3 * 3600000)})
    res.cookie('sessionID', sessionID)
    res.status(201)
    res.send()
})

export default apiSessionTokenRouter
