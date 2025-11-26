const Venta = require('../models/Venta');
const sequelize = require('../config/database');

const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: ['empleado'] // Incluir información del empleado si hay relación
        });

        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener ventas', 
            det: error.message
        });
    }
};

const postVenta = async (req, res) => {
// 1. El Frontend te manda esto:
    const { curp_vendedor, items } = req.body; 
    // items = [ { codigo_visual: "COM-00011", cantidad: 2 }, { codigo_visual: "COM-00012", cantidad: 1 } ]

    const t = await sequelize.transaction();

    try {
        const listaCompletaParaSQL = [];

        // 2. Iteramos lo que mandó el usuario para buscar los datos reales en la BD
        for (const item of items) {
            
            // NOTA: Como tienes herencia, buscar por ID es truculento. 
            // Si tus IDs son únicos globalmente (SERIAL), puedes hacer una consulta raw o buscar en cada tabla.
            // Para simplificar, asumiremos que sabes en qué tabla buscar o usas una vista, 
            // pero aquí hago una búsqueda directa por SQL crudo para hallar el producto sea cual sea su tabla.
            
            const [productoEncontrado] = await sequelize.query(
                `SELECT * FROM productos WHERE codigo_visual = :id`, 
                { 
                    replacements: { id: item.codigo_visual },
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            );

            if (!productoEncontrado) {
                throw new Error(`Producto con ID ${item.id_prod} no encontrado`);
            }

            // 3. Combinamos la info de la BD (precio, nombre) con la del usuario (cantidad)
            // IMPORTANTE: Respetar el orden de columnas del TIPO 'productos' en Postgres:
            // (id_prod, nombre, precio, marca, cantidad) <--- La cantidad aquí es la del stock o la de venta?
            // En tu tipo compuesto, 'cantidad' suele referirse al stock, PERO en el contexto de venta
            // tu trigger usa 'producto.cantidad' para multiplicar. 
            // Así que debemos inyectar la cantidad DE VENTA en ese campo.

            listaCompletaParaSQL.push({
                id_prod: productoEncontrado.id_prod,
                nombre: productoEncontrado.nombre,
                precio: productoEncontrado.precio, // Precio actual de la BD
                marca: productoEncontrado.marca,
                codigo_visual: productoEncontrado.codigo_visual,
                cantidad: item.cantidad // <--- Usamos la cantidad que pidió el usuario
            });
        }

        // 4. Ahora sí, mandamos la lista completa a tu método especial
        // (El que definimos en la respuesta anterior que usa ROW())
        const nuevaVenta = await Venta.crearVenta(curp_vendedor, listaCompletaParaSQL, t);
        console.log(listaCompletaParaSQL)
        await t.commit();

        res.status(201).json({
            msg: 'Venta procesada correctamente',
            venta: nuevaVenta
        });

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findByPk(id, {
            include: ['empleado'] // Incluir información del empleado si hay relación
        });
        if (!venta) {
            return res.status(404).json({
                msg: 'Venta no encontrada'
            });
        }
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor',
            det: error.message
        });
    }
};

const deleteVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findByPk(id);
        if (!venta) {
            return res.status(404).json({
                msg: 'Venta no encontrada'
            });
        }
        
        await venta.destroy();
        
        res.status(200).json({
            msg: 'Venta eliminada con éxito'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar venta',
            det: error.message
        });
    }
};

module.exports = { getVentas, postVenta, getVentaById, deleteVenta };