const Comestibles = require('../models/Comestibles');

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

const getComestiblesById = async (req, res) => {
    const { id } = req.params;
    try {
        const comestible = await Comestibles.findByPk(id);
        if (!comestible) {
            return res.status(404).json({
                msg: 'Comestible no encontrado'
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

module.exports = { getComestibles, postComestibles, getComestiblesById };