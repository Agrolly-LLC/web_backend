'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init({
    title:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    content: { 
      type:DataTypes.TEXT,
      allowNull:false
    },
    location: { 
      type:DataTypes.STRING,
      allowNull:false
    },
    image: { 
      type:DataTypes.STRING,
      allowNull:false
    },
    reference: { 
      type:DataTypes.STRING,
      allowNull:false
    },
    date_happen:{
      type: DataTypes.DATE,
    },
    authour:{
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'News',
    tableName:"news"
  });
  return News;
};