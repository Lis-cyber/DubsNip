const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("review", {
    // rating: {
    //   type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    //   allowNull: false,
    // },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  });
  return Review;
};
