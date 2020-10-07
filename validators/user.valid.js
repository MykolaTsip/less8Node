const Joi  = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum(),
    password: Joi.string(),
    email: Joi.string()
})
