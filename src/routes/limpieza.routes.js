const { Router } = require('express')
const router = Router();
const { getLimpieza, postLimpieza, getLimpiezaById } = require('../controllers/limpieza.controller')

/**
 * @swagger
 * tags:
 *   name: Limpieza
 *   description: Gestión de productos de limpieza
 */

/**
 * @swagger
 * /api/limpieza:
 *   get:
 *     summary: Obtener todos los productos de limpieza
 *     tags: [Limpieza]
 *     description: Endpoint para obtener la lista completa de productos de limpieza
 *     responses:
 *       200:
 *         description: Lista de productos de limpieza obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Limpieza'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getLimpieza);

/**
 * @swagger
 * /api/limpieza:
 *   post:
 *     summary: Crear un nuevo producto de limpieza
 *     tags: [Limpieza]
 *     description: Endpoint para crear un nuevo producto de limpieza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Limpieza'
 *     responses:
 *       201:
 *         description: Producto de limpieza creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto de limpieza guardado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Limpieza'
 *       500:
 *         description: Error al crear el producto de limpieza
 */
router.post('/', postLimpieza);

/**
 * @swagger
 * /api/limpieza/{id}:
 *   get:
 *     summary: Obtener producto de limpieza por ID
 *     tags: [Limpieza]
 *     description: Endpoint para obtener un producto de limpieza específico por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto de limpieza
 *     responses:
 *       200:
 *         description: Producto de limpieza encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Limpieza'
 *       404:
 *         description: Producto de limpieza no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getLimpiezaById);

module.exports = router;