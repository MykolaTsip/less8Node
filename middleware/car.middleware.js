const {ErrorEnum, ErrorStatusEnum, ErrorHandle} = require('../error')
const {carValid} = require('../validators')

module.exports = (req, res, next) => {
    try {
        const car = req.body

        const {error} = carValid.validate(car)

        if (error) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_CAR.message,
                ErrorStatusEnum.NOT_VALID_CAR,
                ErrorEnum.NOT_VALID_CAR.customCode
            ))
        }
        
        next()
    }
    catch (e) {
        next(e)
    }
}
