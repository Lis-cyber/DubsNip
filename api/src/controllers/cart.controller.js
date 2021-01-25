const { Op } = require("sequelize");
const { User, Order, Product } = require("../db.js");

async function emptyCartFromAnUserByUserId(req, res) {
  const { userId } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        userId,
        state: "cart",
      },
    });
    order.destroy();
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function updateCartFromAnUserByUserId(req, res) {
  //ACTUALIZA UN CARRITO POR ID DEL USUARIO, CON PARAMETROS QUE LLEGAN DEL BODY
  const { userId } = req.params;
  const { quantity, productId } = req.body;

  try {
    //Esto nos trae la orden del usuario que le pasamos por params
    const { order } = await User.findOne({
      include: { model: Order, where: { state: "cart" } },
      where: {
        id: userId,
      },
    });

    //encuentra el producto al que le queremos modificar la quantity
    const product = await Product.findByPk(productId);

    await order.addProduct(product, {
      through: {
        quantity,
        price: (product.price - (product.discount * product.price / 100)).toFixed(2) * quantity,
      },
    });

    res.json(await order.getProducts()).status(200);
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
}
async function addProductToUserOrder(req, res) {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) return res.send(404).send("Product not found");

    let order = await Order.findOne({
      where: {
        userId,
        state: 'cart'
      },
    });

    // Si el usuario no posee una orden se la creamos
    if (!order || order.state !== "cart") {
      const today = new Date();
      order = await Order.create({
        state: "cart",
        date: `${today.getUTCDate()}/${today.getUTCMonth()}/${today.getUTCFullYear()}`,
      });
      const user = await User.findByPk(userId);
      order.setUser(user);
    }

    await order.addProduct(product, { through: { price: product.price } });

    const products = await order.getProducts();

    return res.send(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
async function deleteProductFromUserOrder(req, res) {
  const { userId, productId } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId,
        state: "cart",
      },
    });

    if (!order) return res.status(404).send("Order not found");

    const product = await Product.findByPk(productId);

    if (!product) return res.status(404).send("Product not found");

    await order.removeProduct(product);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}
async function getProductsFromUserCartByUserId(req, res) {
  // Crear Ruta que retorne todos los items del Carrito
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: { model: Order, where: { state: "cart" } },
    });

    if (!user) return res.sendStatus(404);

    const orderId = user.order.dataValues.id;

    const order = await Order.findByPk(orderId, {
      include: { model: Product, through: ["quantity", "price"] },
    });

    return res.json(order.products);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
}

async function getOrdersThatAreNotInCartByUserId(req, res) {
  // Ruta que retorne todos las orders de un usuario q no esten en carrito
  const { userId } = req.params;
  try {
    var orders = await Order.findAll({
      where: {
        userId: userId,
        [Op.or]: [
          { state: "created" },
          { state: "paid" },
          { state: "cancelled" },
          { state: "completed" },
        ],
      },
      include: { model: Product, through: ["quantity", "price"] },
    });

    if (!orders) return res.sendStatus(404);

    return res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
}
async function getDetailOfUserOrder_ByUserIdAndOrderId(req, res) {
  // Ruta que retorne el detalle de una orden de un usuario que no esten en carrito
  const { userId, orderId } = req.params;
  try {
    var orders = await Order.findAll({
      where: {
        userId: userId,
        id: orderId,
        // [Op.or]: [
        //   { state: 'created' },
        //   { state: 'paid' },
        //   { state: 'cancelled' },
        //   { state: 'completed' },
        // ]
      },
      include: { model: Product, through: ["quantity", "price"] },
    });

    if (!orders) return res.sendStatus(404);

    return res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
}

async function addProductGuestToUserOrder(req, res) {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);

    if (!product) return res.send(404).send("Product not found");

    let order = await Order.findOne({
      where: {
        userId,
        state: 'cart'
      },
    });

    // Si el usuario no posee una orden se la creamos
    if (!order || order.state !== "cart") {
      const today = new Date();
      order = await Order.create({
        state: "cart",
        date: `${today.getUTCDate()}/${today.getUTCMonth()}/${today.getUTCFullYear()}`,
      });
      const user = await User.findByPk(userId);
      order.setUser(user);
    }

    await order.addProduct(product, { through: { price: product.price, quantity: quantity } });

    const products = await order.getProducts();

    return res.send(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  emptyCartFromAnUserByUserId,
  updateCartFromAnUserByUserId,
  getProductsFromUserCartByUserId,
  getDetailOfUserOrder_ByUserIdAndOrderId,
  addProductToUserOrder,
  deleteProductFromUserOrder,
  getOrdersThatAreNotInCartByUserId,
  addProductGuestToUserOrder
};
