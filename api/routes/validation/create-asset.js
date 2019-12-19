const Joi = require('@hapi/joi');

module.exports = Joi.object({
    asset_number: Joi.string().required(),
    id: Joi.string(),
    model: Joi.string().required(),
    make: Joi.string().required(),
    serial_number: Joi.string().alphanum().required(),
    asset_status: Joi.string().required(),
    build: Joi.string().required(),
    nomis_id: Joi.string().required(),
});
