import jwt from 'jsonwebtoken';

class JWTGenerator{
    constructor(secretKey = 'secret', algorithm = 'HS256') {
        this._secretKey = secretKey
        this._algorithm = algorithm
    }

    generate(payload){
        return jwt.sign(payload, this._secretKey, {algorithm: this._algorithm, expiresIn: '5h'})
    }

    verify(token){
        return jwt.verify(token, this._secretKey, function (err, decoded) {
            return decoded
        })
    }
}

export default JWTGenerator
