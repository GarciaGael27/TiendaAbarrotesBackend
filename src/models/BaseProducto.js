const { Model, DataTypes} = require('sequelize');


const camposComunes = {
    id_prod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    }
};

module.exports = {Model, DataTypes, camposComunes};
