const Limpieza = require('../models/Limpieza');

const getLimpieza = async (req, res) => {
    try {
        const productos = await Limpieza.findAll();

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener productos de limpieza', 
            det: error.message
        });
    }
};

const postLimpieza = async (req, res) => {
    try {
        const nuevoProducto = await Limpieza.create(req.body);

        res.status(201).json({
            msg: 'Producto de limpieza guardado con éxito',
            data: nuevoProducto
        });
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo guardar el producto de limpieza', 
            det: error.message
        });
    }
};

const getLimpiezaById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Limpieza.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                msg: 'Producto de limpieza no encontrado'
            });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor',
            det: error.message
        });
    }
};

module.exports = { getLimpieza, postLimpieza, getLimpiezaById };