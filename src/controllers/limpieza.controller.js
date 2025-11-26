const Limpieza = require('../models/Limpieza');


// Endpoint para obtener todos los productos de limpieza
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

// Endpoint para crear un nuevo producto de limpieza
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

// Endpoint para obtener un producto de limpieza por código visual
const getLimpiezaById = async (req, res) => {
    const { id } = req.params; 
    try {
        const producto = await Limpieza.findOne({
            where: { codigo_visual: id }
        });
        if (!producto) {
            return res.status(404).json({
                msg: `Producto de limpieza con código ${id} no encontrado`
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

// Endpoint para eliminar un producto de limpieza por código visual
const deleteLimpieza = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const producto = await Limpieza.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!producto) {
            return res.status(404).json({
                error: `Producto de limpieza con código ${codigo_visual} no encontrado`
            });
        }

        await producto.destroy();
        res.status(200).json({
            msg: `Producto de limpieza ${codigo_visual} eliminado exitosamente`,
            data: producto
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al eliminar producto de limpieza',
            det: error.message
        });
    }
};

// Endpoint para actualizar un producto de limpieza por código visual
const updateLimpieza = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const producto = await Limpieza.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!producto) {
            return res.status(404).json({
                error: `Producto de limpieza con código ${codigo_visual} no encontrado`
            });
        }

        await producto.update(req.body);
        res.status(200).json({
            msg: `Producto de limpieza ${codigo_visual} actualizado exitosamente`,
            data: producto
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al actualizar producto de limpieza',
            det: error.message
        });
    }
};

module.exports = { getLimpieza, postLimpieza, getLimpiezaById, deleteLimpieza, updateLimpieza };