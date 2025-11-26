const Ropa = require('../models/Ropa');

// Endpoint para obtener todas las prendas de ropa
const getRopa = async (req, res) => {
    try {
        const ropas = await Ropa.findAll();

        res.status(200).json(ropas);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener ropa', 
            det: error.message});
    }
};

// Endpoint para crear una nueva prenda de ropa
const postRopa = async (req, res) =>{
    try {
        const nuevaRopa = await Ropa.create(req.body)

        res.status(201).json({
            msg: 'Prenda guardada con exito',
            data: nuevaRopa
        });
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo guardar la prenda', 
            det: error.message
        })
    }
};

// Endpoint para obtener una prenda de ropa por código visual
const getRopaById = async (req, res) => {
    const { id } = req.params; 
    try {
        const prenda = await Ropa.findOne({
            where: { codigo_visual: id }
        });
        if(!prenda){
            return res.status(404).json({
                msg: `Prenda con código ${id} no encontrada`
            })
        }
        res.status(200).json(prenda)
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor',
            det: error.message
        })
    }
};

// Endpoint para eliminar una prenda de ropa por código visual
const deleteRopa = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const prenda = await Ropa.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!prenda) {
            return res.status(404).json({
                error: `Producto de ropa con código ${codigo_visual} no encontrado`
            });
        }

        await prenda.destroy();
        res.status(200).json({
            msg: `Producto de ropa ${codigo_visual} eliminado exitosamente`,
            data: prenda
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al eliminar prenda',
            det: error.message
        });
    }
};

// Endpoint para actualizar una prenda de ropa por código visual
const updateRopa = async (req, res) => {
    const { codigo_visual } = req.params;
    try {
        const prenda = await Ropa.findOne({
            where: { codigo_visual: codigo_visual }
        });

        if (!prenda) {
            return res.status(404).json({
                error: `Producto de ropa con código ${codigo_visual} no encontrado`
            });
        }

        await prenda.update(req.body);
        res.status(200).json({
            msg: `Producto de ropa ${codigo_visual} actualizado exitosamente`,
            data: prenda
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al actualizar prenda',
            det: error.message
        });
    }
};

module.exports = { getRopa, postRopa, getRopaById, deleteRopa, updateRopa };