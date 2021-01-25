const server = require("express").Router();
// const bcrypt = require("bcrypt"); // --> Libreria de manejo de passwords
// const jwt = require('jsonwebtoken'); // --> JSON Web Token // -->
const {
  getAllUsers,
  getAllOrdersFromAnUser,
  editUserById,
  getProductsFromUserById,
  deleteUserById,
  passwordReset,
  //findUserByEmail,
  getLastOrderFromAUser,
  findUserToResetPass,
  emailContact
} = require("../controllers/user.controller");

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

server.get("/email", findUserToResetPass);
server.post("/emailContact", emailContact);

//  /users/:id
server.get("/:id", getProductsFromUserById);
server.get("/:id/order", getLastOrderFromAUser);
server.delete("/:id", deleteUserById);

// Esta ruta no se esta usando todavia 05/01/2021 23:33hs
server.put("/:id", editUserById);

//   /users/:id/orders
server.get("/:id/orders", getAllOrdersFromAnUser);

server.post("/:id/passwordReset", passwordReset);

//   /users
server.get("/", checkAdmin, getAllUsers);

module.exports = server;
