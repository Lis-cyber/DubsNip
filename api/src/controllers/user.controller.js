const { User, Order, Product } = require("../db.js");
const {
  Sequelize: { Op },
} = require("sequelize");
const bcrypt = require("bcrypt"); // --> Libreria de manejo de passwords
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { passReset, sendEmailContactUs } = require("../mailmodels/mail.controller");

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      where: { isDeleted: false },
      attributes: [
        "id",
        "givenName",
        "familyName",
        "email",
        "isAdmin",
        "photoUrl",
        "address",
        "postal_code",
        "city",
      ],
      order: ["id"],
    });
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
}
//
async function editUserById(req, res) {
  const { id } = req.params;
  const {
    name,
    postal_code,
    address,
    google_id,
    email,
    password,
    picture,
  } = req.body;
  User.update(
    {
      name: name ? name : undefined,
      postal_code: postal_code ? postal_code : undefined,
      address: address ? address : undefined,
      google_id: google_id ? google_id : undefined,
      email: email ? email : undefined,
      passwordHash: passwordHash ? passwordHash : undefined,
      picture: picture ? picture : undefined,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  )
    .then((user) => {
      res.json(user[1]).status(200);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
}

async function getAllOrdersFromAnUser(req, res) {
  // S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
  const { id } = req.params;
  try {
    const orders = await Order.findAll({
      where: {
        userId: id,
      },
    });
    if (orders.length == 0) throw "No orders found for this user";
    res.send(orders);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getProductsFromUserById(req, res) {
  //Devuelve un producto por id
  const { id } = req.params;
  try {
    const userExist = await User.findByPk(id, {
      include: { model: Order },
    });
    //Manejo de errores
    //Si el producto no existe o fue borrado tira error!!
    if (!userExist) throw "Couldn't find user!!";
    res.status(200).send(userExist);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteUserById(req, res) {
  //BORRA UN USUARIO POR ID
  const { id } = req.params;
  try {
    const isUserDeleted = await User.update(
      { isDeleted: true, email: null },
      { where: { id } }
    );
    if (!isUserDeleted) return res.sendStatus(404);
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}

async function findUserToResetPass(req, res) {
  const { email } = req.query;
  try {
    const user = await User.findOne({
      where: { email },

      plain: true,
    });
    if (!user) return res.sendStatus(404);

    const token = jwt.sign(user.dataValues, JWT_SECRET);
    var mail = passReset(user, token);
    if (mail) return res.sendStatus(200);
    else return res.sendStatus(500);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
}

async function passwordReset(req, res) {
  const { id } = req.params;
  const { password } = req.body;
  if (!req.user) return res.sendStatus(401);
  try {
    const user = await User.update(
      {
        password,
      },
      {
        where: { id },
        returning: true,
      }
    );
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

  async function getLastOrderFromAUser(req, res) {
    // Ruta que retorne la orden de carrito de un usuario por id
    const { id } = req.params;
    try {
      
      const user = await User.findByPk(id, {
        include: { model: Order,
                  // where: {state: "cart"}
                  },
      });
      const order = await Order.findOne({
        where: {
          userId: user.id,
          state: "cart"
        },
      });
      res.json(order);
    } catch (err) {
      res.status(404).send(err);
    }
  }

async function emailContact(req, res) {
  const { name, email, message } = req.body;
  try {
    var mail = sendEmailContactUs(name, email, message);
    if (mail) return res.sendStatus(200);
    else return res.sendStatus(500);

  } catch (err) {
    res.status(404).send(err)
  }
}


module.exports = {
  getAllUsers,
  editUserById,
  getAllOrdersFromAnUser,
  getProductsFromUserById,
  deleteUserById,
  passwordReset,
  //findUserByEmail,
  getLastOrderFromAUser,
  findUserToResetPass,
  emailContact
};
