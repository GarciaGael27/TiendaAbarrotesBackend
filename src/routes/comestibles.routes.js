const { Router } = require('express')
const router = Router();
const { getComestibles, postComestibles, getComestiblesById } = require('../controllers/comestibles.controller')

/**
 * @swagger
 * tags:
 *   name: Comestibles
 *   description: Gestión de productos comestibles
 */

/**
 * @swagger
 * /api/comestibles:
 *   get:
 *     summary: Obtener todos los productos comestibles
 *     tags: [Comestibles]
 *     description: Endpoint para obtener la lista completa de productos comestibles
 *     responses:
 *       200:
 *         description: Lista de productos comestibles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comestibles'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getComestibles);

/**
 * @swagger
 * /api/comestibles:
 *   post:
 *     summary: Crear un nuevo producto comestible
 *     tags: [Comestibles]
 *     description: Endpoint para crear un nuevo producto comestible
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comestibles'
 *     responses:
 *       201:
 *         description: Producto comestible creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Comestible guardado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Comestibles'
 *       500:
 *         description: Error al crear el producto comestible
 */
router.post('/', postComestibles);

/**
 * @swagger
 * /api/comestibles/{id}:
 *   get:
 *     summary: Obtener producto comestible por ID
 *     tags: [Comestibles]
 *     description: Endpoint para obtener un producto comestible específico por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto comestible
 *     responses:
 *       200:
 *         description: Producto comestible encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comestibles'
 *       404:
 *         description: Producto comestible no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getComestiblesById);

module.exports = router;