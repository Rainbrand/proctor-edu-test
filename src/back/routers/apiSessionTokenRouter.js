import express from "express";
import {v4 as uuidv4} from 'uuid';
import JWTGenerator from "../jwtHandler.js"
import passport from "passport";
import User from "../../db_models/userModel.js";

const apiSessionTokenRouter = express.Router()

const extractProctorLogins = array => {
    let proctors = []
    for (let proctor of array){
        proctors.push(proctor.username)
    }
    return proctors
}

apiSessionTokenRouter.post('/sesstoken', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const sessionID = uuidv4()
    const jwt = new JWTGenerator()
    const token = req.cookies.token
    const decoded = jwt.verify(token)
    const proctorsFromDatabase = await User.find({role: "proctor"},{'_id': false}).select("username")
    const extractedProctorUsernames = extractProctorLogins(proctorsFromDatabase)
    const generatedToken = jwt.generate({
        username: decoded.username,
        nickname: decoded.nickname,
        template: "default",
        id: sessionID,
        subject: "Test1",
        invites: extractedProctorUsernames,
        tags: [decoded.nickname],
        api: `http://localhost:8080/api/report/${sessionID}`
    })
    res.cookie('token', generatedToken, {expires: new Date(Date.now() + 3 * 3600000)})
        .cookie('sessionID', sessionID).status(200).json(generatedToken)
})

export default apiSessionTokenRouter
