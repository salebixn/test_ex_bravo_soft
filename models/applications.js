import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0')

const applications = sequelize.define('applications', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },  

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
}, {timestamps: false});

export default applications