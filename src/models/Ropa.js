const sequelize = require('../config/database');
const {Model, camposComunes} = require('./BaseProducto');
const { DataTypes } = require('sequelize');


class Ropa extends Model {}
/**
 * @swagger
 * components:
 *   schemas:
 *     Ropa:
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
 *           description: Nombre del producto
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         marca:
 *           type: string
 *           description: Marca del producto
 *         talla:
 *           type: string
 *           enum: [CH, M, G, XG]
 *           description: Talla del producto
 *         tipo_tela:
 *           type: string
 *           description: Tipo de tela del producto
 *         tipo:
 *           type: string
 *           description: Tipo de ropa
 *         color:
 *           type: string
 *           description: Color del producto
 *         genero:
 *           type: string
 *           description: Género al que está dirigido el producto
 *       example:
 *         nombre: "Pantalón Levi's"
 *         precio: 850.00
 *         marca: "Levi's"
 *         talla: "M"
 *         tipo_tela: "Mezclilla"
 *         tipo: "Pantalón"
 *         color: "Azul"
 *         genero: "Unisex"
 */

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