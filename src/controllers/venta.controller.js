const Venta = require('../models/Venta');
const sequelize = require('../config/database');

// Endpoint para obtener todas las ventas
const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: ['empleado'] 
        });

        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener ventas', 
            det: error.message
        });
    }
};

// Endpoint para crear una nueva venta
const postVenta = async (req, res) => {
    const { curp_vendedor, items } = req.body; 
    // items = [ { codigo_visual: "COM-00011", cantidad: 2 }, { codigo_visual: "COM-00012", cantidad: 1 } ]

    const t = await sequelize.transaction();

    try {
        const listaCompletaParaSQL = [];
        for (const item of items) {            
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
            listaCompletaParaSQL.push({
                id_prod: productoEncontrado.id_prod,
                nombre: productoEncontrado.nombre,
                precio: productoEncontrado.precio, 
                marca: productoEncontrado.marca,
                codigo_visual: productoEncontrado.codigo_visual,
                cantidad: item.cantidad 
            });
        }
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

// Endpoint para obtener una venta por ID
const getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findByPk(id, {
            include: ['empleado'] 
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

// Endpoint para eliminar una venta por ID
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