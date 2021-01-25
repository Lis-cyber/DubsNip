const {
  Sequelize: { Op },
} = require("sequelize");
const { Product, Category } = require("../db.js");
//
async function getAllProducts(req, res) {
  //Devuelve todos los productos
  try {
    const products = await Product.findAll({
      order: [["name", "ASC"]],
    });
    if (products.length < 1) return res.sendStatus(404);
    res.send(products);
  } catch (err) {
    return res.sendStatus(404);
  }
}

async function searchProducts(req, res) {
  const { keyword } = req.query;
  try {
    const matchedProducts = await Product.findAll({
      where: {
        [Op.or]: [
          //busca por nombre O por categoría
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
            stock: {
              [Op.gt]: 0, //trae solo elementos que tengan stock
            },
          },
          {
            description: {
              [Op.iLike]: `%${keyword}%`,
            },
            stock: {
              [Op.gt]: 0, //trae solo elementos que tengan stock
            },
          },
        ],
      },
    });

    const matchedCategories = await Product.findAll({
      include: {
        model: Category,
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      },
    });

    res.send([...matchedProducts, ...matchedCategories]);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function createProduct(req, res) {
  //Carga un producto por BODY
  let { name, description, price, discount, stock, picture, checks } = req.body;
  //Chequea por campos obligatorios
  price = parseFloat(price);
  stock = parseInt(stock);
  try {
    const product = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      picture,
    });
    //Asks if "checks" exists
    if (checks.length > 0) {
      //For each category in the array we add it to the product
      checks.forEach(async (category) => {
        try {
          const dbCategory = await Category.findOne({
            where: { name: category },
          });
          product.addCategory(dbCategory);
        } catch (err) {
          console.error(err);
        }
      });
    }
    return res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
}

async function getProductById(req, res) {
  //Devuelve un producto por id
  const { id } = req.params;
  try {
    const productExist = await Product.findByPk(id, {
      include: { model: Category },
    });
    //Manejo de errores
    //Si el producto no existe o fue borrado tira error!!
    if (!productExist) throw "Couldn't find product!!";
    res.status(200).send(productExist);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    const isProductDeleted = await Product.destroy({
      where: { id },
    });
    //Si el producto no existe tira error!!
    if (!isProductDeleted) throw "Couldn't find product!!";
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
}


async function getAllProductsDiscount(req, res) {
  //Devuelve todos los productos
  try {
    const products = await Product.findAll({
      where: {
        discount: {
          [Op.gte]: 1
        }
      },
      order: [ ['name', 'ASC'] ]
    });
    if (products.length < 1) return res.sendStatus(404);
    res.send(products);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function getLastProductsAdded(req, res) {
  try {
    const products = await Product.findAll({
      limit: 6,
      order: [["createdAt", "DESC"]],
    });
    if (!products.length) throw "No products found";
    return res.status(200).send(products);
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = {
  deleteProductById,
  getLastProductsAdded,
  getProductById,
  getAllProducts,
  searchProducts,
  createProduct,
  getAllProductsDiscount
};
