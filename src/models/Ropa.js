const {sequelize} = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');


class Ropa extends Model {}

Ropa.init({
    ...camposComunes,
    tipo_tela: DataTypes.STRING(100),
    talla: DataTypes.STRING(100),
    tipo: DataTypes.STRING(50),
    color: DataTypes.STRING(20),
    genero: DataTypes.STRING(10),
},{
    sequelize,
    modelName: 'Ropa',
    tableName: 'ropa',
    timestamps: false
});

module.exports = Ropa;