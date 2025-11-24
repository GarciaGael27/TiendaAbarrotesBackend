const Empleado = require('./Empleado');
const Venta = require('./Venta');

// Definir todas las asociaciones aquí
const definirAsociaciones = () => {
    try {
        // Un empleado puede tener muchas ventas
        Empleado.hasMany(Venta, {
            foreignKey: 'vendedor',
            sourceKey: 'curp',
            as: 'ventas'
        });

        // Una venta pertenece a un empleado
        Venta.belongsTo(Empleado, {
            foreignKey: 'vendedor',
            targetKey: 'curp',
            as: 'empleado'
        });
    } catch (error) {
        console.error('Error al definir asociaciones:', error);
        throw error;
    }
};

module.exports = { definirAsociaciones };