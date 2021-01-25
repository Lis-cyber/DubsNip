// index.js

const { Router } = require("express");
// import all routers;
const authRouter = require("./auth.js");
const categoryRouter = require("./category.js");
const productRouter = require("./product.js");
const productCategoryRouter = require("./productCategory.js");
const userRouter = require("./user.js");
const orderRouter = require("./order.js");
const cartRouter = require("./cart.js");
const reviewRouter = require("./review.js");
const mercadopagoRouter = require("./mercadopago.js");
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/auth", authRouter);
router.use("/products/category", categoryRouter);
router.use("/products", productCategoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/users", cartRouter);
router.use("/orders", orderRouter);
router.use("/product", reviewRouter);
router.use("/mercadopago", mercadopagoRouter);

module.exports = router;
