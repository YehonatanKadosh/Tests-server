const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  findAllTags,
  createTag,
} = require("../services/mongoose/requestHandlers/tag");
const tagRouter = express.Router();

tagRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllTags())
);

tagRouter.post("/", [auth, admin], async (req, res, next) =>
  res.send(await createTag(req.body))
);

module.exports = tagRouter;
