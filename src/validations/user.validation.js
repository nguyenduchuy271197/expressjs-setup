const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().lowercase().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUser,
};
