const Joi = require("joi");
require("dotenv").config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description("Mongo DB url"),
    LOGTAIL_TOKEN: Joi.string().required().description("Logtail source token"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo: {
    uri:
      envVars.NODE_ENV === "test" ? envVars.MONGO_URI_TESTS : envVars.MONGO_URI,
  },
  logs: envVars.NODE_ENV === "production" ? "combined" : "dev",
  logtailToken: envVars.LOGTAIL_TOKEN,
};
