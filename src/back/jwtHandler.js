import jwt from 'jsonwebtoken';

class JWTGenerator{
    /**
     * Class handles signing and verifying of jwt tokens
     *
     * @class
     * @param secretKey - Key with which token signs
     * @param algorithm - Algorithm of signing
     */
    constructor(secretKey = 'secret', algorithm = 'HS256') {
        /**
         * Property is secret key for signing tokens. Default is 'secret'
         *
         * @type {string}
         * @private
         */
        this._secretKey = secretKey
        /**
         * Property is algorithm for signing tokens. Default is 'HS256'
         *
         * @type {string}
         * @private
         */
        this._algorithm = algorithm
    }

    /**
     * Method generates a new signed token
     *
     * @param payload - Information for signing
     * @param expirationTime - Expiration time for token. Default is 3 hours
     * @method
     * @return {*} - Signed token
     */
    generate(payload, expirationTime = "3h"){
        return jwt.sign(payload, this._secretKey, {algorithm: this._algorithm, expiresIn: expirationTime})
    }

    /**
     * Method verifies passed token
     *
     * @param token - Token to be verified
     * @return {*} - Decoded token
     */
    verify(token){
        return jwt.verify(token, this._secretKey, function (err, decoded) {
            return decoded
        })
    }
}

export default JWTGenerator
