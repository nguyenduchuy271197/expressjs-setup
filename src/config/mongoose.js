const { mongo } = require("./config");
const logger = require("./logger");
const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(mongo.uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    if (error) throw error;
  }
};

module.exports = { connectMongo };
