const jwt = require('jsonwebtoken')

const conf = require('../configs/configs')

module.exports = () => {
    const access_token = jwt.sign({a: 'b'}, conf.ACCESS_TOKEN_SECRET, {expiresIn: '2m'})
    const refresh_token = jwt.sign({a: 'c'}, conf.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})


    return {
        access_token,
        refresh_token
    }
}
