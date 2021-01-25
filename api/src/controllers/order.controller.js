const {
  Sequelize: { Op },
} = require("sequelize");
const { Order, Product, User } = require("../db.js");
//
async function getAllOrders(req, res) {
  //Returns all the orders, it can receive querys with the status of the order i want
  const { status } = req.query;
  try {
    //Si hay status, retorna las orders con ese status
    //Sino, devuelve todas
    if (status) {
      var orders = await Order.findAll({
        where: { state: status },
        include: Product,
      });
    } else {
      var orders = await Order.findAll({
        where: {
          [Op.or]: [
            { state: "created" },
            { state: "paid" },
            { state: "cancelled" },
            { state: "completed" },
          ],
        },
        include: { model: Product },
        order: [["id", "DESC"]],
      });
    }
    res.status(200).send(orders);
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
}

async function getOrderById(req, res) {
  // s46 ruta que retorne  una orden en particular
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, { include: Product });
    if (!order) {
      return res.status(404).end();
    }
    return res.json(order);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function editOrderById(req, res) {
  const { state } = req.body;
  //s47 modificar una orden
  try {
    const order = await Order.update(
      {
        state,
      },
      {
        where: {
          id: req.params.id,
        },
        // state: req.body,
        returning: true,
      }
    );
    if (!order) {
      return res.status(404).end();
    }
    return res.json(order[1]);
  } catch (err) {
    return res.status(404).end();
  }
}

async function editOrderByIdUser(req, res) {
  try {
    const order = await Order.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
      plain: true,
    });
    if (!order) {
      return res.status(404);
    }
    return res.json(order[1]);
  } catch (err) {
    return res.status(400).end();
  }
}

async function checkOrderToPayment(req, res) {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        state: "cart",
      },
    });
    let products = await order.getProducts();
    const check = [];
    products.forEach((product) => {
      const p = Product.findOne({
        where: {
          id: product.id,
          stock: { [Op.gte]: product.Order_Product.quantity },
        },
      });

      check.push(p);
    });
    const newCheck = await Promise.all(check);
    if (newCheck.includes(null) === true) {
      return res.sendStatus(404);
    }

    products.forEach((product) => {
      Product.update(
        { stock: product.stock - product.Order_Product.quantity },
        {
          where: {
            id: product.id,
          },
          returning: true,
          plain: true,
        }
      );
      return product;
    });

    return res.json("ok");
  } catch (err) {
    return res.sendStatus(400).send(err);
  }
}

async function orderSuccess(req, res) {
  const { id } = req.params;
  try {
      const order = await Order.findOne({
        where: { 
          id,
          state: 'paid'},
      });
    
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
}


module.exports = {
  getAllOrders,
  getOrderById,
  editOrderById,
  editOrderByIdUser,
  checkOrderToPayment,
  orderSuccess,
};

