const pkg = require("mongoose");
const { connect } = pkg;

connect(process.env.MongoKEY || "").then((mongoose) => {
  mongoose.connection.on("disconnecting", () =>
    console.log("mongoDB disconnected")
  );

  console.log("mongoDb connected");
});
