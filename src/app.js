require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganMiddleware = require("./config/morgan");
const helmet = require("helmet");
const axios = require("axios");
const logger = require("./config/logger");

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

app.get("/crypto", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api2.binance.com/api/v3/ticker/24hr"
    );

    const tickerPrice = response.data;

    res.json(tickerPrice);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = app;
