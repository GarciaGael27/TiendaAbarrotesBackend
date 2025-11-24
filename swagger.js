const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Tienda de Abarrotes',
    description: 'API RESTful para gestión de una tienda de abarrotes',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Ropa', description: 'Gestión de productos de ropa' },
    { name: 'Empleados', description: 'Gestión de empleados' },
    { name: 'Ventas', description: 'Gestión de ventas' },
    { name: 'Comestibles', description: 'Gestión de productos comestibles' },
    { name: 'Limpieza', description: 'Gestión de productos de limpieza' }
  ],
  definitions: {
    Ropa: {
      id_prod: 1,
      nombre: "Camisa",
      precio: 25.99,
      marca: "Nike", 
      cantidad: 10,
      tipo_tela: "Algodón",
      talla: "M",
      tipo: "Camisa",
      color: "Azul",
      genero: "hombre"
    },
    Empleado: {
      curp: "ABCD123456HDFXXX01",
      nombre: "Juan Pérez",
      edad: 30,
      puesto: "Vendedor",
      salario: 15000.00
    },
    Venta: {
      id_venta: 1,
      vendedor: "ABCD123456HDFXXX01",
      num_productos: ["prod1", "prod2"],
      total: 150.50,
      metodo_pago: "efectivo"
    }
  }
};

// Archivo donde se generará la documentación 
const outputFile = './swagger_output.json';

// Usar el archivo de rutas específico para swagger
const routes = ['./swagger-routes.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('✅ Documentación generada correctamente');
  console.log('📄 Revisa: swagger_output.json');
});