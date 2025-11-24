const Ropa = require('../models/Ropa');

const getRopa = async (req, res) => {
    try {
        const ropas = await Ropa.findAll();

        res.status(200).json(ropas);
    } catch (error) {
        // Error al obtener ropa
        res.status(500).json({
            error: 'Error al obtener ropa', 
            det: error.message});
    }
};

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

const getRopaById = async (req, res) => {
    const { id } = req.params;
    try {
        const prenda = await Ropa.findByPk(id);
        if(!prenda){
            return res.status(404).json({
                msg: 'Prenda no encontrada'
            })
        }
        res.status(200).json(prenda)
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor'
        })
    }
};

module.exports = { getRopa, postRopa, getRopaById };