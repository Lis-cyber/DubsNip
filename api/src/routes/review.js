const server = require("express").Router();
const {
  createReview,
  getReview,
  updateReview,
  deleteReview 
} = require("../controllers/review.controller");

// /product/:id/review
server.post("/:id/review", createReview);
server.get("/:id/review", getReview);

// /product/:id/review/:idReview
server.put("/:id/review/:idReview", updateReview);
server.delete("/:id/review/:idReview", deleteReview);


module.exports = server;