const server = require("express").Router();

const {
  getAllProducts,
  searchProducts,
  createProduct,
  getProductById,
  deleteProductById,
  getAllProductsDiscount,
  getLastProductsAdded,
} = require("../controllers/product.controller");

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(401);
  next();
};

// /products/search?keyword={value}
server.get("/search", searchProducts);

// /products/lastproducts
server.get("/lastproducts", getLastProductsAdded);

// /products/
server.get("/", getAllProducts);
server.get("/discount", getAllProductsDiscount);

// /products/:id
server.get("/:id", getProductById);

// admin routes
// /products/
server.post("/", checkAdmin, createProduct);

// /products/:id
server.delete("/:id", checkAdmin, deleteProductById);

module.exports = server;
