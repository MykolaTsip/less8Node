const Joi = require('joi')

module.exports = Joi.object().keys({
    idcars: Joi.number(),
    model: Joi.string().trim().required(),
    year: Joi.number().required(),
    price: Joi.number().required()
})
