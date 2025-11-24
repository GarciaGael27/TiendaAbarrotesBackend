const sequelize = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');

class Limpieza extends Model{}

/**
 * @swagger
 * components:
 *   schemas:
 *     Limpieza:
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
 *           description: Nombre del producto de limpieza
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
 *         uso:
 *           type: string
 *           description: Uso específico del producto (cocina, baño, ropa, etc.)
 *         porcion:
 *           type: integer
 *           description: Tamaño de la porción o contenido
 *       example:
 *         nombre: "Detergente para Ropa"
 *         precio: 45.00
 *         marca: "Ariel"
 *         cantidad: 30
 *         uso: "Ropa"
 *         porcion: 1
 */

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