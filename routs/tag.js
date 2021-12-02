const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  findAllTags,
  createTag,
  findTagsByTopics,
} = require("../services/mongoose/requestHandlers/tag");
const tagRouter = express.Router();

tagRouter.get("/", [auth, admin], async (req, res, next) => {
  if (req.query.topics) res.send(await findTagsByTopics(req.query.topics));
  else next("no topics provided");
});

tagRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await createTag(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = tagRouter;
