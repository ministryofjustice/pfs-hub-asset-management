const Joi = require('@hapi/joi');

module.exports = Joi.object({
    asset_number: Joi.string(),
    id: Joi.string(),
    model: Joi.string(),
    make: Joi.string(),
    serial_number: Joi.string(),
    asset_status: Joi.string(),
    build: Joi.string(),
    nomis_id: Joi.string(),
});
