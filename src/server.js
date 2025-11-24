const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Configuracion de base de datos
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Swagger JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tienda de Abarrotes',
      version: '1.0.0',
      description: 'API RESTful para gestión de una tienda de abarrotes con productos de ropa, comestibles, limpieza, empleados y ventas',
      contact: {
        name: 'API Support',
        email: 'support@tienda-abarrotes.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/models/*.js'] // Archivos que contienen anotaciones Swagger
};

// Generar especificación de Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "API Tienda de Abarrotes",
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        persistAuthorization: true,
    }
}));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Tienda de Abarrotes funcionando correctamente',
        documentation: 'http://localhost:' + PORT + '/api-docs',
        endpoints: {
            ropa: '/api/ropa',
            empleados: '/api/empleado',
            ventas: '/api/venta'
        }
    });
});

// Función para inicializar modelos
const inicializarModelos = async () => {
    try {        
        // Cargar modelos PRIMERO (sin asociaciones)
        require('./models/Ropa');
        
        require('./models/Empleado');
        
        require('./models/Venta');
        
        require('./models/Comestibles');
        
        require('./models/Limpieza');
        
        
        // DESPUÉS cargar las asociaciones
        const { definirAsociaciones } = require('./models/associations');
        definirAsociaciones();
        
    } catch (error) {
        console.error('Error al cargar modelos:', error.message);
        throw error;
    }
};

// Configuracion de rutas
const cargarRutas = () => {
    try {
        const ropaRoutes = require('./routes/ropa.routes');
        const empleadoRoutes = require('./routes/empleado.routes');
        const ventaRoutes = require('./routes/venta.routes');
        const comestiblesRoutes = require('./routes/comestibles.routes');
        const limpiezaRoutes = require('./routes/limpieza.routes');
        
        app.use('/api/ropa', ropaRoutes);
        app.use('/api/empleado', empleadoRoutes);
        app.use('/api/venta', ventaRoutes);
        app.use('/api/comestibles', comestiblesRoutes);
        app.use('/api/limpieza', limpiezaRoutes);
        
        console.log('Rutas de API configuradas');
        console.log('Documentación Swagger disponible en: http://localhost:' + PORT + '/api-docs');
    } catch (error) {
        console.error('Error al cargar rutas:', error);
        throw error;
    }
};

// Inicializar servidor
const inicializarServidor = async () => {
    try {
        console.log('Verificando conexión a base de datos...');
        
        // Probar conexión
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL exitosa');
        
        // Cargar modelos Y asociaciones
        await inicializarModelos();
        

        // Cargar rutas
        cargarRutas();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error('Error al inicializar servidor:', error);
        process.exit(1);
    }
};

inicializarServidor();