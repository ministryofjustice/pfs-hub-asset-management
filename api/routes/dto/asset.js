const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.string().required(),
    model: Joi.string().required(),
    make: Joi.string().required(),
    serial_number: Joi.string().alphanum().required()
});
