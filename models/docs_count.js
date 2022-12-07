import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0')

const docs_count = sequelize.define('docs_count', {
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

export default docs_count