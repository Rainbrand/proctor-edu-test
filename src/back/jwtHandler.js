import jwt from 'jsonwebtoken';

class JWTGenerator{
    constructor(secretKey = 'secret', algorithm = 'HS256') {
        this._secretKey = secretKey
        this._algorithm = algorithm
    }

    generate(payload, expirationTime = "3h"){
        return jwt.sign(payload, this._secretKey, {algorithm: this._algorithm, expiresIn: expirationTime})
    }

    verify(token){
        return jwt.verify(token, this._secretKey, function (err, decoded) {
            return decoded
        })
    }
}

export default JWTGenerator
