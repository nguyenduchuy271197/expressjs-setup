const app = require("./app");
const { env, port } = require("./config/config");
const { connectMongo } = require("./config/mongoose");
const logger = require("./config/logger");

// open mongoose connection
connectMongo().then(() => {
  // listen to requests
  app.listen(port, () =>
    logger.info(`server started on port ${port} (${env})`)
  );
});
