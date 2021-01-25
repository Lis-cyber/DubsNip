require("dotenv").config();
const { User } = require("../db.js");
const { sendEmailConfirmation } = require("../mailmodels/mail.controller");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, CLIENT_URL } = process.env;

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

const registerUser = async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, givenName, familyName, email, photoURL, isAdmin } = user;
    const token = jwt.sign(
      {
        id,
        givenName,
        familyName,
        email,
        photoURL,
        isAdmin,
      },
      JWT_SECRET
    );

    const [isMailSent, info] = await sendEmailConfirmation(user, token);
    if (isMailSent) {
      console.log(info);
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400).send(err);
  }
};

const confirmEmailCb = async function (req, res) {
  if (!req.user) return res.sendStatus(404);
  const { id } = req.user;
  await User.update(
    {
      isMailVerified: true,
    },
    { where: { id } }
  );
  return res.sendStatus(200);
};

const logUser = function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, JWT_SECRET));
  })(req, res, next);
};

const googleCb = function (req, res, next) {
  passport.authorize("google", function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    const userJson = JSON.stringify(user);
    const token = jwt.sign(userJson, JWT_SECRET);
    return res.redirect(`${CLIENT_URL}/sign-in/${token}`);
  })(req, res, next);
};

const meCb = async function (req, res) {
  try {
    if (!req.user?.id) throw "No user found";
    let user = await User.findByPk(req.user.id, {
      attributes: [
        "address",
        "city",
        "email",
        "familyName",
        "givenName",
        "googleId",
        "id",
        "isAdmin",
        "photoUrl",
        "postal_code",
      ],
    });
    return res.send(user);
  } catch (err) {
    console.error(err);
    res.status(401).send(err);
  }
};

const promoteUser = async function (req, res) {
  let { id } = req.params;
  let { isAdmin } = req.body;
  try {
    const user = await User.update(
      { isAdmin: isAdmin },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      }
    );
    res.json(user[1]).status(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  checkAdmin,
  registerUser,
  confirmEmailCb,
  logUser,
  googleCb,
  meCb,
  promoteUser,
};
