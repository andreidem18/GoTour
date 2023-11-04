'use strict';
const {
  Model
} = require('sequelize');
const { deleteFromCloudinary } = require('../utils/cloudinary');

module.exports = (sequelize, DataTypes) => {
  class tour extends Model {

    static associate(models) {
      tour.belongsTo(
        models.user, 
        { foreignKey: {name: 'guideId'}
      });
      tour.belongsTo(models.location);
      tour.hasMany(models.tourImg)
      tour.hasMany(models.review, {
        foreignKey: { allowNull: false }
      });
      tour.hasMany(models.booking, {
        foreignKey: { allowNull: false }
      })
    }

  }
  tour.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxGroupSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    imageCover: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tour',
    hooks: {
      beforeDestroy: async(tour) => {
        await deleteFromCloudinary(tour.imageCover);
      },
    },
  });
  return tour;
};