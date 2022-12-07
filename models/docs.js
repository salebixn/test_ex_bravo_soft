import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0')

const docs = sequelize.define('docs', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
}, {timestamps: false});

export default docs