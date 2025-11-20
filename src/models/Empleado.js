const {sequelize} = require('../config/database');
const { DataTypes } = require('sequelize');
const { Venta } = require('./Venta');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

class Empleado extends Model{}


Empleado.init({
    curp:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: DataTypes.STRING(50),
    edad: DataTypes.INTEGER,
    puesto: DataTypes.STRING(50),
    salario: DataTypes.DECIMAL(10,2)

},{
    sequelize,
    tableName: 'empleado',
    timestamps: false
});

Empleado.hasMany(Venta, { foreignKey: 'vendedor'});

module.exports = Empleado;