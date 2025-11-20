const {sequelize} = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');

class Comestibles extends Model{}

Comestibles.init({
    ...camposComunes,

    fecha_caducidad: DataTypes.DATE,
    tipo: DataTypes.STRING(50),
    porcion: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Comestibles',
    tableName: 'comestibles',
    timestamps: false
});

module.exports = Comestibles;