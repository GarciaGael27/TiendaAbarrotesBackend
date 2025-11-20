const {sequelize} = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');

class Limpieza extends Model{}

Limpieza.init({
    ...camposComunes,

    uso: DataTypes.STRING(50),
    porcion: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Limpieza',
    tableName: 'limpieza',
    timestamps: false
});

module.exports = Limpieza;