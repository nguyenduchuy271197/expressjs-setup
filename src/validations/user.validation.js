const Joi = require("joi");
const { password } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().lowercase().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

module.exports = {
  createUser,
};
