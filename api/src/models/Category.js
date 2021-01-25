const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  //AGEGAR HOOK PARA PONER EL NAME EN LOWERCASE
  Category.addHook("beforeValidate", (category) => {
    category.name = category.name.toLowerCase();
  });

};
