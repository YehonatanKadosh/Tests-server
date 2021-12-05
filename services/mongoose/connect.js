const pkg = require("mongoose");
const logger = require("../logger");
const { connect } = pkg;

connect(process.env.MongoKEY || "")
  .then((mongoose) => {
    mongoose.connection.on("disconnecting", (disconnected) =>
      logger.error("mongoDB disconnected", disconnected)
    );

    logger.info("mongoDb connected");
  })
  .catch(logger.error);
