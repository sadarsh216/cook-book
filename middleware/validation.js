const Joi = require("@hapi/joi");
const validateRegistration = (reqData) =>{
    const schema = Joi.object({
        firstname: Joi.string().min(6).max(25).required(),
		lastname: Joi.string().min(3).max(25).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().required().pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")),
    })
    return schema.validate(reqData);
}
module.exports.validateRegistration = validateRegistration;