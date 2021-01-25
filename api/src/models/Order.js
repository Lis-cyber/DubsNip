const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Order = sequelize.define("order", {
    state: {
      type: DataTypes.ENUM("cart", "created", "paid", "cancelled", "completed"),
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
};
