// config
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

// routers
const loginRouter = require("./routs/login/login");
const signupRouter = require("./routs/signup");

// app config
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config app routers
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

// errors handler
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

// general handler
app.get("*", (req, res, next) => {
  res.send("database is up and running");
});

app.listen(port, () => {
  console.log(`app is up on port ${port}`);
});

require("./services/mongoose/connect");
