const jwt = require('jsonwebtoken')

const constant = require('../configs/constants')
const conf = require('../configs/configs')
const {ErrorHandle, ErrorStatusEnum, ErrorEnum} = require('../error')
const {OAuthService} = require('../services')


module.exports = async (req, res, next) => {
    try {
        const token = req.get(constant.AUTHORIZATION)

        if (!token) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_TOKEN.message,
                ErrorStatusEnum.NOT_VALID_TOKEN,
                ErrorEnum.NOT_VALID_TOKEN.customCode
            ))
        }

        jwt.verify(token, conf.ACCESS_TOKEN_SECRET, err => {
            if (err) {
                return next(new ErrorHandle(
                    'token not validity',
                    ErrorStatusEnum.NOT_VALID_TOKEN,
                    ErrorEnum.NOT_VALID_TOKEN.customCode
                ))
            }
        })

        const tokenWithUser = await  OAuthService.getByParams({access_token: token}, ['id'])

        console.log('-------')
        console.log(tokenWithUser)
        console.log('-------')

        req.user = tokenWithUser.User

        next()

    } catch (e) {
        next(e)
    }
}
