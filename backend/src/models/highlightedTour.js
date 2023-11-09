'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class highlightedTour extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models.tour, { foreignKey: { allowNull: false }});
    }
  }
  highlightedTour.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'highlightedTour',
  });
  return highlightedTour;
};