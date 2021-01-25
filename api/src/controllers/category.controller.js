const { Category, Product } = require("../db.js");

async function createCategory(req, res) {
  const { name, description } = req.body;
  if (!name || !description) return res.sendStatus(400);
  try {
    const category = await Category.create({
      name,
      description,
    });
    return res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
//
async function deleteCategoryById(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function editCategoryById(req, res) {
  //ACTUALIZA UNA CATEGORIA DESDE EL COMPONENTE CategoryEdit.jsx
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await Category.update(
      {
        name,
        description,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    res.json(category[1][0]).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function getCategoryByName_or_getAllCategories(req, res) {
  const { nombreCat } = req.params;
  const nombreCatLower = nombreCat.toLowerCase();
  try {
    if (!nombreCat) {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    }
    const product = await Product.findAll({
      include: { model: Category, where: { name: nombreCatLower } },
    });
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    if (categories.length < 1) throw "No categories found";
    res.json(categories);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) throw "Category not found";
    res.status(200).send(category);
  } catch (err) {
    res.status(404).send(err);
  }
}


// async function getCategoryByName_or_getAllCategoriesDiscount(req, res) {
//   const { nombreCat } = req.params;
//   const nombreCatLower = nombreCat.toLowerCase();
//   try {
//     if (!nombreCat) {
//       const categories = await Category.findAll();
//       res.status(200).send(categories);
//     }
//     const product = await Product.findAll({
//       where: {
//         discount: {
//           [Op.gte]: 1
//         }
//       },
//       include: { model: Category, where: { name: nombreCatLower } },
//     });
//     res.status(200).send(product);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  getCategoryByName_or_getAllCategories,
  editCategoryById,
  getCategoryById,
  // getCategoryByName_or_getAllCategoriesDiscount
};
