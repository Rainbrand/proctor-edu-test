const jwt = require('jsonwebtoken');

class JWTGenerator{
    constructor(secretKey = 'secret', algorithm = 'HS256') {
        this.secretKey = secretKey
        this.algorithm = algorithm
    }

    generate(payload){
        return jwt.sign(payload, this.secretKey, this.algorithm, { expiresIn: '1h' })
    }
}

module.exports = JWTGenerator
