const server = require("express").Router();
const {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getCategoryByName_or_getAllCategories,
  getCategoryById,
  // getCategoryByName_or_getAllCategoriesDiscount,
} = require("../controllers/category.controller.js");

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

//  /products/category
server.post("/", checkAdmin, createCategory);
server.get("/", getAllCategories);

//  /products/category/:id
server.delete("/:id", checkAdmin, deleteCategoryById);
server.put("/:id", checkAdmin, editCategoryById);

//  /products/category/:nombreCat
server.get("/:nombreCat", getCategoryByName_or_getAllCategories);
//  /products/category/discount/:nombreCat
// server.get("discount/:nombreCat", getCategoryByName_or_getAllCategoriesDiscount);

// /products/category/detail/:id
server.get("/detail/:id", getCategoryById);
//
module.exports = server;
