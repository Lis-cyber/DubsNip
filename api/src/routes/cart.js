const {
  updateCartFromAnUserByUserId,
  getProductsFromUserCartByUserId,
  emptyCartFromAnUserByUserId,
  addProductToUserOrder,
  deleteProductFromUserOrder,
  getOrdersThatAreNotInCartByUserId,
  getDetailOfUserOrder_ByUserIdAndOrderId,
  addProductGuestToUserOrder
} = require("../controllers/cart.controller.js");
const server = require("express").Router();

//   /users/:userId/cart/
server.get("/:userId/cart", getProductsFromUserCartByUserId);
server.put("/:userId/cart", updateCartFromAnUserByUserId);
server.post("/:userId/cart", addProductToUserOrder);
server.delete("/:userId/cart", emptyCartFromAnUserByUserId);
server.delete("/:userId/cart/:productId", deleteProductFromUserOrder);
server.post("/:userId/cart/guest", addProductGuestToUserOrder)

//  /users/:userId/orders/detail
server.get("/:userId/orders/detail", getOrdersThatAreNotInCartByUserId);

// GET /users/:userId/orders/detail/:orderId
server.get(
  "/:userId/orders/detail/:orderId",
  getDetailOfUserOrder_ByUserIdAndOrderId
);

module.exports = server;
