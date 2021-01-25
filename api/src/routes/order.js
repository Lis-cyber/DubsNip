const {
  getAllOrders,
  getOrderById,
  editOrderById,
  editOrderByIdUser,
  checkOrderToPayment,
  orderSuccess
} = require("../controllers/order.controller.js");
const server = require("express").Router();

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

// /orders
server.get("/success/:id", orderSuccess);
server.put("/orderToPayment/:id", checkOrderToPayment);
server.put("/shippingAddress/:id", editOrderByIdUser);
server.get("/", checkAdmin, getAllOrders);

// /orders/:id
server.get("/:id", checkAdmin, getOrderById);
server.put("/:id", checkAdmin, editOrderById);

module.exports = server;
