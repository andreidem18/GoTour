'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.user, {
        foreignKey: { allowNull: false }
      });
      review.belongsTo(models.tour, {
        foreignKey: { allowNull: false }
      });
    }
  }
  review.init({
    description: DataTypes.TEXT,
    rating: DataTypes.DECIMAL,
    // tourId
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};