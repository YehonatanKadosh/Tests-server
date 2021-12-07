const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  newQueezsVersion,
  createQueez,
  updateQueez,
  findQueezsByTopic,
  removeQueez,
} = require("../services/mongoose/requestHandlers/queez");
const queezRouter = express.Router();

queezRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    if (req.body._id) res.send(await newQueezsVersion(req.body));
    else res.send(await createQueez(req.body));
  } catch (error) {
    next(error);
  }
});

queezRouter.put("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await updateQueez(req.body));
  } catch (error) {
    next(error);
  }
});

queezRouter.get("/", [auth, admin], async (req, res, next) => {
  const { topic } = req.query;
  if (topic) res.send(await findQueezsByTopic(topic));
  else next("no topic provided");
});

queezRouter.delete("/", [auth, admin], async (req, res, next) =>
  res.send({ ...(await removeQueez(req.body)), ...req.body })
);

module.exports = queezRouter;
