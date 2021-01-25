const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order_Product = sequelize.define('Order_Product', {
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      //ESTO LO COMENTE MOMENTANEAMENTE LAURA PARA QUE ME DEJE AGREGAR PRODUCTOS AL ORDER
      // allowNull: false,
      //  validate: {
      //    min: 0.01
      //  },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  });
};
