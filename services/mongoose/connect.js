import pkg from "mongoose";
const { connect } = pkg;

connect(process.env.MongoKEY || "").then((mongoose) => {
  mongoose.connection.on("disconnecting", () => {
    "mongoDB disconnected";
  });
  console.log("mongoDb connected");
});
