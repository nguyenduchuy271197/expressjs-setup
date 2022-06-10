require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganMiddleware = require("./config/morgan");
const helmet = require("helmet");
const { errorHandler } = require("./middlewares/error");
const routes = require("./routes/v1");

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

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

app.use("/api/v1", routes);

app.use(errorHandler);

module.exports = app;
