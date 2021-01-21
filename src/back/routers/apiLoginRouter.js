import express from "express";
import bcrypt from 'bcryptjs';
import JWTGenerator from "../jwtHandler.js"
import userModel from "../../db_models/userModel.js";

/**
 * Express router instance.
 * @type {object}
 * @const
 */
const apiLoginRouter = express.Router()

/**
 * Function returns new token
 * @param payload - Information to be signed.
 * @return {*} - jwt token.
 */
const getToken = payload => {
    const jwt = new JWTGenerator()
    return jwt.generate(payload)
}

/**
 * Route serving login.
 *
 * @name post/api/login
 * @function
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
apiLoginRouter.post('/login', async (req, res) => {
    const candidate = await userModel.findOne({username: req.body.username})
    if (candidate){
        try{
            const passwordResult = await bcrypt.compare(req.body.password, candidate.password)
            if (passwordResult){
                const token = getToken({username: req.body.username, nickname: candidate.nickname})
                res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000), httpOnly: true})
                    .status(200).redirect('/')
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

export default apiLoginRouter
