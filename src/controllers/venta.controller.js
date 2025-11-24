const Venta = require('../models/Venta');

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
    try {
        const nuevaVenta = await Venta.create(req.body);

        res.status(201).json({
            msg: 'Venta guardada con éxito',
            data: nuevaVenta
        });
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo guardar la venta', 
            det: error.message
        });
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

module.exports = { getVentas, postVenta, getVentaById };