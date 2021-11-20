const { connect } = require("mongoose");

connect(process.env.MongoKEY || "").then((mongoose) => {
  mongoose.connection.on("disconnecting", () => {
    "mongoDB disconnected";
  });
  console.log("mongoDb connected");
});
