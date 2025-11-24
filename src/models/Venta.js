const sequelize = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Venta extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       required:
 *         - vendedor
 *         - total
 *         - metodo_pago
 *       properties:
 *         id_venta:
 *           type: integer
 *           description: ID autogenerado de la venta
 *         vendedor:
 *           type: string
 *           description: CURP del empleado que realizó la venta
 *         num_productos:
 *           type: array
 *           items:
 *             type: string
 *           description: Array con los IDs de los productos vendidos
 *         total:
 *           type: number
 *           format: float
 *           description: Total de la venta
 *       example:
 *         vendedor: "GAGA950827HDFRRL09"
 *         num_productos: ["1", "5", "12"]
 *         total: 150.75
 */

Venta.init({
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'empleado',
            key: 'curp'
        }
    },
    num_productos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Venta',
    tableName: 'venta',
    timestamps: false
});

module.exports = Venta;