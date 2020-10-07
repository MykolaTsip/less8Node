const {userValid} = require('../validators')
const  {ErrorHandle, ErrorStatusEnum, ErrorEnum} = require('../error')

module.exports = (req, res, next) => {
    try {
const user = req.body

        const {error} = userValid.validate(user)

        if (error) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_USER.message,
                ErrorStatusEnum.NOT_VALID_USER,
                ErrorEnum.NOT_VALID_USER.customCode
            ))
        }

        next()
    }
    catch (e) {
        next(e)
    }
}
