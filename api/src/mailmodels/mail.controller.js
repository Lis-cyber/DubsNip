var nodemailer = require("nodemailer");
var mg = require("nodemailer-mailgun-transport");
let { resetEmailHtml, confirmEmailHtml, paymentHtml } = require("./mailModels");
const { MAILGUN_API_KEY, MAILGUN_DOMAIN, CLIENT_URL } = process.env;

var auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN,
  },
};

let transporter = nodemailer.createTransport(mg(auth));

async function passReset(user, token) {
  resetEmailHtml = resetEmailHtml.replace(
    "%url%",
    `${CLIENT_URL}/resetPassword/${token}`
  );
  resetEmailHtml = resetEmailHtml.replace("%name%", user.dataValues.givenName);

  try {
    let info = await transporter.sendMail({
      from: '"DubsNip Store" <dubsnip.store@gmail.com>',
      to: user.dataValues.email,
      subject: `Dubsnip recover password instructions.`,
      text: `Hi! ${user.dataValues.givenName}, 

        Someone requested a password reset for your account. If this was not you, please disregard this email. 
        If you'd like to continue copy the link below in your browser.

        ${CLIENT_URL}/resetPassword/${token}
      `,
      html: resetEmailHtml, // html body
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function sendEmailConfirmation(user, token) {
  confirmEmailHtml = confirmEmailHtml.replace(
    "%url%",
    `${CLIENT_URL}/confirm-email/${token}`
  );
  confirmEmailHtml = confirmEmailHtml.replace(
    "%name%",
    user.dataValues.givenName
  );

  try {
    let info = await transporter.sendMail({
      from: '"DubsNip Store" <dubsnip.store@gmail.com>',
      to: user.dataValues.email,
      subject: `Hi ${user.dataValues.givenName}! Please verify your email.`,
      text: `Hi ${user.dataValues.givenName}! 

        Thanks for joining us! 
        Please confirm your email address by copying the link below on your browser.
        If this was not you, please disregard this email.

        ${CLIENT_URL}/confirm-email/${token}
      `,
      html: confirmEmailHtml, // html body
    });

    return [true, info];
  } catch (err) {
    console.error(err);
    return [false, err];
  }
}

async function sendPaymentMail(orderId, user) {
  paymentHtml = paymentHtml.replace("%orderId%", orderId);
  paymentHtml = paymentHtml.replace("%name%", user.dataValues.givenName);
  try {
    let info = await transporter.sendMail({
      from: '"DubsNip Store" <dubsnip.store@gmail.com>',
      to: user.dataValues.email,
      subject: `Your payment was successfull!`,
      text: `Hi ${user.dataValues.givenName}! 

        We recevied your payment successfully!
        If you want to see you ticket details, please go to:

        ${CLIENT_URL}/payment/success/${orderId}
      `,
      html: paymentHtml, // html body
    });
  } catch (err) {
    console.error(err);
  }
}

async function sendEmailContactUs(name, email, message) {
  try {
    let info = await transporter.sendMail({
      from: email,
      to: '"DubsNip Store" <lisjardim6@gmail.com>',
      subject: `Hi DubsNip! ${name} wants to contact you !`,
      text: message,
    });
    return [true, info];
  } catch (err) {
    console.error(err);
    return [false, err];
  }
}

module.exports = {
  passReset,
  sendEmailConfirmation,
  sendPaymentMail,
  sendEmailContactUs,
};
