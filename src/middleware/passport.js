import jwt from 'passport-jwt'
const {Strategy, ExtractJwt} = jwt
import userModel from "../db_models/userModel.js";

const cookieExtractor = await function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies[`token`];
    }
    return token;
};

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "secret"
}

export default passport => {
    passport.use(new Strategy(options, async (payload, done) => {
        try {
            const user = await userModel.findOne({username: payload.payload.payload.username})
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
