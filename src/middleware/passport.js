import jwt from 'passport-jwt'
const {Strategy, ExtractJwt} = jwt
import userModel from "../db_models/userModel.js";

/**
 * Function handles extraction token from cookie if existing
 *
 * @param req - request from client
 * @returns {string} token - token extracted from cookie
 */
const cookieExtractor = await function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies[`token`];
    }
    return token;
};

/**
 * Constant describes options for passport authenticator
 * @constant
 * @type {{jwtFromRequest, secretOrKey: string}}
 */
const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "secret"
}

/**
 * Functions handles authentication
 *
 * @param passport - Instance of passport.js
 */
const userTokenAuth = passport => {
    passport.use(new Strategy(options, async (payload, done) => {
        try {
            const user = await userModel.findOne({username: payload.username}).select("username nickname")
            if (user){
                console.log("User found")
                done(null, user)
            } else {
                console.log("User not found")
                done(null, false)
            }
        } catch (e){
            console.log(e)
        }
    }))
}

export default userTokenAuth
