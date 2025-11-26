const Empleado = require('../models/Empleado');

const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();

        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener empleados', 
            det: error.message
        });
    }
};

const postEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = await Empleado.create(req.body);

        res.status(201).json({
            msg: 'Empleado guardado con éxito',
            data: nuevoEmpleado
        });
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo guardar el empleado', 
            det: error.message
        });
    }
};

const getEmpleadoById = async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({
                msg: 'Empleado no encontrado'
            });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({
            error: 'Error en servidor',
            det: error.message
        });
    }
};

const deleteEmpleado = async (req, res) => {
    const { curp } = req.params;
    try {
        const empleado = await Empleado.findOne({
            where: { curp: curp }
        });

        if (!empleado) {
            return res.status(404).json({
                error: `Empleado con CURP ${curp} no encontrado`
            });
        }

        await empleado.destroy();
        res.status(200).json({
            msg: `Empleado con CURP ${curp} eliminado exitosamente`,
            data: empleado
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al eliminar empleado',
            det: error.message
        });
    }
};

const updateEmpleado = async (req, res) => {
    const { curp } = req.params;
    try {
        const empleado = await Empleado.findOne({
            where: { curp: curp }
        });

        if (!empleado) {
            return res.status(404).json({
                error: `Empleado con CURP ${curp} no encontrado`
            });
        }

        await empleado.update(req.body);
        res.status(200).json({
            msg: `Empleado con CURP ${curp} actualizado exitosamente`,
            data: empleado
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor al actualizar empleado',
            det: error.message
        });
    }
};

module.exports = { getEmpleados, postEmpleado, getEmpleadoById, deleteEmpleado, updateEmpleado };