'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.tour, 
        { foreignKey: {name: 'guideId'}
      })
      user.hasMany(models.review, {
        foreignKey: { allowNull: false }
      });
      user.hasMany(models.booking, {
        foreignKey: { allowNull: false }
      });
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordChangeAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    role: {
      type: DataTypes.ENUM('user', 'guide', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });
  user.prototype.toJSON = function () {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
  }
  return user;
};



