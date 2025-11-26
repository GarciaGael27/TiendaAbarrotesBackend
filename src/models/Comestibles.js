const sequelize = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');

class Comestibles extends Model{}
/**
 * @swagger
 * components:
 *   schemas:
 *     Comestibles:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - marca
 *       properties:
 *         id_prod:
 *           type: integer
 *           description: ID autogenerado por PostgreSQL
 *         nombre:
 *           type: string
 *           description: Nombre del producto comestible
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         marca:
 *           type: string
 *           description: Marca del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad disponible en inventario
 *           default: 0
 *         fecha_caducidad:
 *           type: string
 *           format: date
 *           description: Fecha de caducidad del producto
 *         tipo:
 *           type: string
 *           description: Tipo de alimento (lácteo, carne, vegetal, etc.)
 *         porcion:
 *           type: string
 *           description: Tamaño de la porción
 *       example:
 *         nombre: "Leche Entera"
 *         precio: 25.50
 *         marca: "Alpura"
 *         cantidad: 50
 *         fecha_caducidad: "2025-12-31"
 *         tipo: "Lácteo"
 *         porcion: "250 ml"
 */

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