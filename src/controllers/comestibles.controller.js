const Comestibles = require('../models/Comestibles');


// Endpoint para obtener todos los comestibles
const getComestibles = async (req, res) => {
    try {
        const comestibles = await Comestibles.findAll();

        res.status(200).json(comestibles);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener comestibles', 
            det: error.message
        });
    }
};

// Endpoint para crear un nuevo comestible
const postComestibles = async (req, res) => {
    try {
        const nuevoComestible = await Comestibles.create(req.body);

        res.status(201).json({
            msg: 'Comestible guardado con éxito',
            data: nuevoComestible
        });
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo guardar el comestible', 
            det: error.message
        });
    }
};

// Endpoint para obtener un comestible por código visual
const getComestiblesById = async (req, res) => {
    const { id } = req.params; 
    try {
        const comestible = await Comestibles.findOne({
            where: { codigo_visual: id }
        });
        if (!comestible) {
            return res.status(404).json({
                msg: `Comestible con código ${id} no encontrado`
            });
        }
        res.status(200).json(comestible);
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor',
            det: error.message
        });
    }
};

// Endpoint para eliminar un comestible por código visual
const deleteComestible = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const comestible = await Comestibles.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!comestible) {
            return res.status(404).json({
                error: `Producto comestible con código ${codigo_visual} no encontrado`
            });
        }

        await comestible.destroy();
        res.status(200).json({
            msg: `Producto comestible ${codigo_visual} eliminado exitosamente`,
            data: comestible
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al eliminar comestible',
            det: error.message
        });
    }
};

// Endpoint para actualizar un comestible por código visual
const updateComestible = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const comestible = await Comestibles.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!comestible) {
            return res.status(404).json({
                error: `Producto comestible con código ${codigo_visual} no encontrado`
            });
        }

        await comestible.update(req.body);
        res.status(200).json({
            msg: `Producto comestible ${codigo_visual} actualizado exitosamente`,
            data: comestible
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al actualizar comestible',
            det: error.message
        });
    }
};

module.exports = { getComestibles, postComestibles, getComestiblesById, deleteComestible, updateComestible };