import express from "express";
import JWTGenerator from "../jwtHandler.js"
import User from "../../db_models/userModel.js";

const apiTokenRouter = express.Router()

apiTokenRouter.post('/register', async (req, res) => {
    const username = req.body.username
    const nickname = req.body.nickname
    const password = req.body.password
    const candidate = await User.findOne({username: username})
    if (candidate){
        res.status(409).json("This username is already taken")
    } else {
        const newUser = new User({
            username: username,
            nickname: nickname,
            password: password,
            role: "student"
        })
        try {
            await newUser.save()
            console.log(`New user with username ${username} is created`)
            const jwt = new JWTGenerator()
            const token = jwt.generate({
                username: username,
                nickname: nickname
            })
            res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000)})
            res.status(201)
            res.send()
        } catch (e){
            console.log(e)
        }
    }
})

export default apiTokenRouter
