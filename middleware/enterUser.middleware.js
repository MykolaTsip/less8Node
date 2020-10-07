const {userService} = require('../services')
const {ErrorEnum, ErrorStatusEnum, ErrorHandle} = require('../error')

module.exports = async (req, res, next) => {
    try {
        const {name} = req.body

        let user = await userService.findByName({name})

        if (!user) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_USER.message,
                ErrorStatusEnum.NOT_VALID_USER,
                ErrorEnum.NOT_VALID_USER.customCode
            ))
        }

      req.user = user
        next()
    }
    catch (e) {
        next(e)
    }


}
