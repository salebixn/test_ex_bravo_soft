import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0')

const constructors = sequelize.define('constructors', {
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

export default constructors