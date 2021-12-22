const express = require("express");
const { recovery_validator } = require("quizy-yk-common");
const {
  findUserByEmail,
} = require("../services/mongoose/requestHandlers/user");
const sendEmail = require("../services/sendGrid/send");
const emailRouter = express.Router();

emailRouter.post("/", async (req, res, next) => {
  try {
    await recovery_validator.validate(req.body);
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) next("User not found");
    else {
      const msg = {
        to: email,
        from: "jacojacoj3@gmail.com",
        subject: "Password Recovery Quizy",
        // text:
        html: `<div style="display: flex; justify-content: center;">
                <a href="">
                  <button style="border-radius: 10px;">
                    Recover Your Password
                  </button>
                </a>
              </div>`,
      };
      sendEmail(msg);
      res.end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = emailRouter;
