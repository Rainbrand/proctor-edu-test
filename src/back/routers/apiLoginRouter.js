import express from "express";
import bcrypt from 'bcryptjs';
import JWTGenerator from "../jwtHandler.js"
import userModel from "../../db_models/userModel.js";

const apiTokenRouter = express.Router()

const getToken = payload => {
    const jwt = new JWTGenerator()
    return jwt.generate({
        payload
    })
}

apiTokenRouter.post('/login', async (req, res) => {
    const candidate = await userModel.findOne({username: req.body.username})
    if (candidate){
        try{
            const passwordResult = await bcrypt.compare(req.body.password, candidate.password)
            if (passwordResult){
                const token = getToken({username: req.body.username, nickname: candidate.nickname})
                res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000)})
                res.status(200)
                res.send()
            } else {
                res.status(401).json("Password is wrong")
            }
        } catch (e){
            console.log(e)
        }
    } else {
        res.status(401).json("No such user")
    }
})
