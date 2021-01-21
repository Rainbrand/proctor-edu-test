import express from "express";
import bcrypt from 'bcryptjs';
import JWTGenerator from "../jwtHandler.js"
import User from "../../db_models/userModel.js";

const apiRegisterRouter = express.Router()

apiRegisterRouter.post('/register', async (req, res) => {
    const username = req.body.username
    const nickname = req.body.nickname
    const role = req.body.role
    const candidate = await User.findOne({username: username})
    if (candidate){
        res.status(409).json("This username is already taken")
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username: username,
                nickname: nickname,
                password: hashedPassword,
                role: role
            })
            await newUser.save()
            console.log(`New user with username ${username} is created`)
            const jwt = new JWTGenerator()
            const token = jwt.generate({
                username: username,
                nickname: nickname
            })
            res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000), httpOnly: true})
                .status(201).redirect('/')
        } catch (e){
            res.status(500).json('Internal server error')
            console.log(e)
        }
    }
})

export default apiRegisterRouter
