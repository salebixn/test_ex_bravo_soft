import {DataTypes} from 'sequelize'
import {sequelize} from '../config.js'

export const constructors = sequelize.define('constructors', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    patronymic: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false});


export const docs_count = sequelize.define('docs_count', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  doc_name: {
      type: DataTypes.STRING,
      allowNull: false
  },

  count: {
    type: DataTypes.INTEGER
}
}, {timestamps: false});


export const docs = sequelize.define('docs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {timestamps: false});