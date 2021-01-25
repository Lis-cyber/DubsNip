const { Product, Category } = require("../db.js");
//
async function editProductById_AndCategoriesByChecklist(req, res) {
  //ACTUALIZA UN PRODUCTO Y SUS CATEGORIAS
  try {
    let { checks, picture, stock, price, discount, description, name, id } = req.body;
    await Product.update(
      {
        name,
        description,
        price,
        discount,
        stock,
        picture,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    const product = await Product.findOne({
      where: { id },
      include: { model: Category },
    });
    const categories = await product.getCategories();
    await product.removeCategories(categories);

    checks.forEach(async (category, i) => {
      try {
        if (typeof category === "string") {
          const dbCategory = await Category.findOne({
            where: { name: category },
          });
          await product.addCategory(dbCategory);
        }
      } catch (err) {
        console.error(err);
      }
    });
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}
module.exports = { editProductById_AndCategoriesByChecklist };
