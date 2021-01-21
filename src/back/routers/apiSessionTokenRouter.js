import express from "express";
import {v4 as uuidv4} from 'uuid';
import JWTGenerator from "../jwtHandler.js"
import passport from "passport";
import User from "../../db_models/userModel.js";

/**
 * Express router instance.
 * @type {object}
 * @const
 */
const apiSessionTokenRouter = express.Router()

/**
 * Function extracts proctor logins from passed array
 *
 * @param array - Array with list of proctors
 * @return {[]} - Array with usernames of proctors
 */
const extractProctorLogins = array => {
    let proctors = []
    for (let proctor of array){
        proctors.push(proctor.username)
    }
    return proctors
}

/**
 * Route serving session token. Returns current session token if user was already in the middle of proctoring session and
 * new token if not. Invites all proctors registered in db, so to watch a session proctor should be registered
 *
 * @name post/api/login
 * @function
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
apiSessionTokenRouter.post('/sesstoken', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const sessionID = uuidv4()
    const jwt = new JWTGenerator()
    const token = req.cookies.token
    const decoded = jwt.verify(token)
    if (decoded.id) {
        res.cookie('token', token, {expires: new Date(Date.now() + 3 * 3600000), httpOnly: true})
            .status(200).json(token)
    } else {
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
            api: `http://localhost:8080/api/report/`    //Change localhost and port on production
        }, '1h')
        res.cookie('token', generatedToken, {expires: new Date(Date.now() + 3 * 3600000), httpOnly: true})
            .status(200).json(generatedToken)
    }
})

export default apiSessionTokenRouter
