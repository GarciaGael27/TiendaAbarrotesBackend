const { Model, DataTypes} = require('sequelize');


const camposComunes = {
    id_prod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo_visual: {
        type: DataTypes.STRING(20),
        allowNull: true, 
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100)
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    marca: {
        type: DataTypes.STRING(100)
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
};

module.exports = {Model, DataTypes, camposComunes};
