const sequelize = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Venta extends Model {

    // Función auxiliar para evitar errores con comillas (SQL Injection simple)
    static escapar(texto) {
        if (!texto) return '';
        // Reemplaza una comilla simple ' por dos '' (así se escapa en SQL)
        return texto.toString().replace(/'/g, "''");
    }

    static async crearVenta(curpVendedor, listaProductos, transaccion) {
        // Mapeamos el array de objetos a un string literal de Postgres ROW()
        const filas = listaProductos.map(p => {
            const nombreSafe = Venta.escapar(p.nombre);
            const marcaSafe = Venta.escapar(p.marca);

            // Construimos la fila exacta: ROW(id, nombre, precio, marca, cantidad)
            // IMPORTANTE: El orden de campos debe coincidir con la definición de tabla 'productos'
            return `ROW(${p.id_prod}, '${nombreSafe}', ${p.precio}, '${marcaSafe}', ${p.cantidad}, '"${p.id_prod}"')::productos`;
        }).join(',');

        // El string final se ve como: ARRAY[ROW(...)::productos, ROW(...)::productos]
        const queryLiteral = `ARRAY[${filas}]`;

        const sql = `
            INSERT INTO venta (vendedor, "num_productos") 
            VALUES (:curp, ${queryLiteral}) 
            RETURNING id_venta, total, vendedor;
        `;
        
        // Ejecutamos la inserción raw
        const resultado = await sequelize.query(sql, {
            replacements: { curp: curpVendedor },
            type: sequelize.QueryTypes.INSERT,
            transaction: transaccion
        });

        // Postgres devuelve un array de arrays [[resultado, meta]]
        return resultado[0][0]; 
    }
}
/**
 * @swagger
 * components:
 *   schemas:
 *     ItemVenta:
 *       type: object
 *       required:
 *         - id_prod
 *         - cantidad
 *       properties:
 *         codigo_visual:
 *           type: string
 *           description: Código visual único del producto (Ropa, Comestible o Limpieza)
 *           example: "COM-00011"
 *         cantidad:
 *           type: integer
 *           description: Cantidad de unidades a vender
 *           example: 2
 *     
 *     VentaInput:
 *       type: object
 *       required:
 *         - curp_vendedor
 *         - items
 *       properties:
 *         curp_vendedor:
 *           type: string
 *           description: CURP válida del empleado que realiza la venta
 *           example: "ABCD900101HDFRRA05"
 *         items:
 *           type: array
 *           description: Lista de productos a vender
 *           items:
 *             $ref: '#/components/schemas/ItemVenta'
 *     
 *     VentaResponse:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           example: "Venta registrada con éxito"
 *         detalle:
 *           type: object
 *           properties:
 *             id_venta:
 *               type: integer
 *             total:
 *               type: number
 *               format: double
 *               description: Total calculado automáticamente por el Trigger de la BD
 *             vendedor:
 *               type: string
 */

Venta.init({
    id_venta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    num_productos: DataTypes.ARRAY(DataTypes.STRING), 
    vendedor: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2)
}, {
    sequelize,
    tableName: 'venta',
    timestamps: false
});

module.exports = Venta;