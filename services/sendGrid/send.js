const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (msg) => {
  sgMail.send(msg).catch((error) => {
    console.error(error);
  });
};

module.exports = sendEmail;
