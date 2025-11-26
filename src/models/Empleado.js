const sequelize = require('../config/database');
const { DataTypes, Model } = require('sequelize');

class Empleado extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - curp
 *         - nombre
 *         - edad
 *         - puesto
 *         - salario
 *       properties:
 *         curp:
 *           type: string
 *           description: CURP del empleado (Clave Única de Registro de Población)
 *         nombre:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               maxLength: 50
 *               description: Nombre del empleado
 *             apellido_paterno:
 *               type: string
 *               maxLength: 50
 *               description: Apellido paterno del empleado
 *             apellido_materno:
 *               type: string
 *               maxLength: 50
 *               description: Apellido materno del empleado
 *           description: Tipo compuesto con datos del nombre completo
 *         edad:
 *           type: integer
 *           description: Edad del empleado
 *         direccion:
 *           type: object
 *           properties:
 *             calle:
 *               type: string
 *               maxLength: 100
 *               description: Calle y número del domicilio
 *             numero:
 *               type: string
 *               maxLength: 10
 *               description: Número exterior e interior
 *             colonia:
 *               type: string
 *               maxLength: 50
 *               description: Colonia del domicilio
 *             ciudad:
 *               type: string
 *               maxLength: 50
 *               description: Ciudad del domicilio
 *             codigo_postal:
 *               type: string
 *               maxLength: 10
 *               description: Código postal del domicilio
 *           description: Tipo compuesto con datos de dirección
 *         puesto:
 *           type: string
 *           maxLength: 50
 *           description: Puesto o cargo del empleado
 *         salario:
 *           type: number
 *           format: float
 *           description: Salario del empleado
 *       example:
 *         curp: "GAGA950827HDFRRL09"
 *         nombre:
 *           nombre: "Gabriel"
 *           apellido_paterno: "García"
 *           apellido_materno: "López"
 *         edad: 28
 *         direccion:
 *           calle: "Av. Siempre Viva"
 *           numero: "742"
 *           colonia: "Centro"
 *           ciudad: "Springfield"
 *           codigo_postal: "62704"
 *         puesto: "Cajero"
 *         salario: 8500.00
 */

Empleado.init({
    curp: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('nombre');
            if (typeof rawValue === 'string' && rawValue.startsWith('(')) {
                const content = rawValue.slice(1, -1);
                const parts = content.split(',').map(part => part.trim().replace(/"/g, ''));
                return {
                    nombre: parts[0] || '',
                    apellido_paterno: parts[1] || '',
                    apellido_materno: parts[2] || ''
                };
            }
            return rawValue;
        },
        set(value) {
            if (typeof value === 'object' && value !== null) {
                const formatted = `("${value.nombre || ''}","${value.apellido_paterno || ''}","${value.apellido_materno || ''}")`;
                this.setDataValue('nombre', formatted);
            } else {
                this.setDataValue('nombre', value);
            }
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('direccion');
            if (typeof rawValue === 'string' && rawValue.startsWith('(')) {
                const content = rawValue.slice(1, -1);
                const parts = content.split(',').map(part => part.trim().replace(/"/g, ''));
                return {
                    calle: parts[0] || '',
                    numero: parts[1] || '',
                    colonia: parts[2] || '',
                    ciudad: parts[3] || '',
                    codigo_postal: parts[4] || ''
                };
            }
            return rawValue;
        },
        set(value) {
            if (typeof value === 'object' && value !== null) {
                const formatted = `("${value.calle || ''}","${value.numero || ''}","${value.colonia || ''}","${value.ciudad || ''}","${value.codigo_postal || ''}")`;
                this.setDataValue('direccion', formatted);
            } else {
                this.setDataValue('direccion', value);
            }
        }
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puesto: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Empleado',
    tableName: 'empleado',
    timestamps: false
});

module.exports = Empleado;