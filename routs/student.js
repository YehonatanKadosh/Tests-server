const express = require("express");
const { roles } = require("quizy-yk-common");
const studentRouter = express.Router();
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  getStudentRecords,
} = require("../services/mongoose/requestHandlers/quizRecord");
const { getAllStudents } = require("../services/mongoose/requestHandlers/user");

studentRouter.get("/records", [auth, admin], async (req, res, next) => {
  const { id } = req.query;
  if (!id) next("no id provided");
  else res.send(await getStudentRecords(id));
});

studentRouter.get("/", [auth, admin], async (req, res, next) => {
  const students = await getAllStudents();
  res.send(
    students.map(({ firstName, lastName, _id, email, phoneNumber }) => {
      return { firstName, lastName, _id, email, phoneNumber };
    })
  );
});

module.exports = studentRouter;
