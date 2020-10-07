const bcrypt = require('bcrypt')
const {ErrorHandle, ErrorStatusEnum, ErrorEnum} = require('../error')

module.exports = (pass, heshPass) => {
    let getHesh = bcrypt.compare(pass, heshPass)

    if (!getHesh) {
        throw new  ErrorHandle(
            ErrorEnum.NOT_FOUND_USER.message,
            ErrorStatusEnum.NOT_VALID_USER,
            ErrorEnum.NOT_VALID_USER.customCode
        )
    }

    return getHesh
}
