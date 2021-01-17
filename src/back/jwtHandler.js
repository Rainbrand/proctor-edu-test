import jwt from 'jsonwebtoken';

class JWTGenerator{
    constructor(secretKey = 'secret', algorithm = 'HS256') {
        this.secretKey = secretKey
        this.algorithm = algorithm
    }

    generate(payload){
        return jwt.sign({payload}, this.secretKey, {algorithm: this.algorithm, expiresIn: '1h'})
    }
}

export default JWTGenerator
