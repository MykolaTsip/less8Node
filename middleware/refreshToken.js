const jwt = require('jsonwebtoken')

const constant = require('../configs/constants')
const conf = require('../configs/configs')
const {ErrorEnum, ErrorStatusEnum, ErrorHandle} = require('../error')
const {OAuthService} = require('../services')

module.exports = async (req, res, next) => {
    try {
        let token = req.get(constant.AUTHORIZATION)

        if (!token) {
            return next(new ErrorHandle(
                ErrorEnum.OLD_TOKEN.message,
                ErrorStatusEnum.OLD_TOKEN,
                ErrorEnum.OLD_TOKEN.customCode
            ))
        }

        jwt.verify(token, conf.REFRESH_TOKEN_SECRET, err => {
            if (err) {
                return next(new ErrorHandle(
                    ErrorEnum.OLD_TOKEN.message,
                    ErrorStatusEnum.OLD_TOKEN,
                    ErrorEnum.OLD_TOKEN.customCode
                ))
            }
        })

const refToken = await OAuthService.getByParams({refresh_token: token})

        if (!refToken) {
            return next(new ErrorHandle(
                ErrorEnum.OLD_TOKEN.message,
                ErrorStatusEnum.OLD_TOKEN,
                ErrorEnum.OLD_TOKEN.customCode
            ))
        }
        // console.log('=====')
        //
        // console.log(refToken)
        // console.log('===')

        req.user = refToken.User

        next()
    }
    catch (e) {
        next(e)
    }



}
