const server = require("express").Router();
const {
  editProductById_AndCategoriesByChecklist,
} = require("../controllers/productCategory.controller");

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

// /products/category
server.put("/category", checkAdmin, editProductById_AndCategoriesByChecklist);

module.exports = server;
