// config
import {} from "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4000;

// routers
import loginRouter from "./routs/login.js";
import signupRouter from "./routs/signup.js";
import userRouter from "./routs/user.js";
import topicRouter from "./routs/topic.js";
import tagRouter from "./routs/tag.js";

// app config
app.use(cors({ exposedHeaders: process.env.JWTHeaderName }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config app routers
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/topic", topicRouter);
app.use("/tag", tagRouter);

// errors handler
app.use((err, req, res, next) => {
  res.status(400).send(err);
  console.log(err);
});

// general handler
app.get("*", (req, res, next) => {
  res.send("database is up and running");
});

app.listen(port, () => {
  console.log(`app is up on port ${port}`);
});

import "./services/mongoose/connect.js";
