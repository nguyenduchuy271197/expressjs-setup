require("dotenv").config();
require("express-async-errors");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const morganMiddleware = require("./config/morgan");
const helmet = require("helmet");
const { errorHandler, errorConverter } = require("./middlewares/error");
const routes = require("./routes/v1");
const { jwtStrategy } = require("./config/passport");

const app = express();

// Set up morgan
app.use(morganMiddleware);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
// });

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
