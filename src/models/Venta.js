const {sequelize} = require('../config/database')
const {Model, DataTypes} = require('sequelize')

class Venta extends Model {}

Venta.init({
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Aquí está el truco para 'productos[]'
  num_productos: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Tratamos el contenido como objetos JSON
    // O si Postgres lo devuelve como string parseable:
    // type: DataTypes.ARRAY(DataTypes.STRING) 
  },
  total: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  sequelize,
  tableName: 'venta',
  timestamps: false
});

Venta.belongsTo(Empleado, { foreignKey: 'vendedor'})

module.exports = Venta;