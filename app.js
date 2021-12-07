// config
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const logger = require("./services/logger");

// routers
const loginRouter = require("./routs/login");
const signupRouter = require("./routs/signup");
const userRouter = require("./routs/user");
const topicRouter = require("./routs/topic");
const tagRouter = require("./routs/tag");
const questionRouter = require("./routs/question");
const queezRouter = require("./routs/queez");

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
app.use("/question", questionRouter);
app.use("/queez", queezRouter);

// errors handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(400).send(err);
});

// general handler
app.get("*", (req, res, next) => res.send("database is up and running"));

app.listen(port, () => console.log(`app is up on port ${port}`));

require("./services/mongoose/connect");
