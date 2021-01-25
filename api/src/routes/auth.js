const server = require("express").Router();
const passport = require("passport");
const {
  checkAdmin,
  registerUser,
  confirmEmailCb,
  logUser,
  googleCb,
  meCb,
  promoteUser,
} = require("../controllers/auth.controller");

// /auth/register
server.post("/register", registerUser);

// /auth/confirmEmail
server.put("/confirmEmail", confirmEmailCb);

// /auth/login
server.post("/login", logUser);

// /auth/google
server.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// /auth/google/callback
server.get("/google/callback", googleCb);

// /auth/me
server.get("/me", meCb);

// /auth/promote/:id
server.put("/promote/:id", checkAdmin, promoteUser);

module.exports = server;
