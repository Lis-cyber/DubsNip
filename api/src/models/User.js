const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
//creo el modelo de usuarios
module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      givenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
          if (value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue("password", hash);
          }
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isMailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.password);
  };
  return User;
};
