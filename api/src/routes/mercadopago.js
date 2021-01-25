const server = require("express").Router();
const {
  generateMpUrl,
  getPaymentInfo,
  getPaymentInfoById,
} = require("../controllers/mercadopago.controller");

//Creates an url for payment
server.post("/", generateMpUrl);

//Returns payment info
server.get("/payment", getPaymentInfo);

//Returns one especific payment info
server.get("/payment/:id", getPaymentInfoById);

module.exports = server;
