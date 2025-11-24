const { Router } = require('express')
const router = Router();
const { getVentas, postVenta, getVentaById } = require('../controllers/venta.controller')

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Gestión de ventas
 */

/**
 * @swagger
 * /api/venta:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     description: Endpoint para obtener la lista completa de ventas con información del empleado
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getVentas);

/**
 * @swagger
 * /api/venta:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     description: Endpoint para registrar una nueva venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Venta guardada con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Error al registrar la venta
 */
router.post('/', postVenta);

/**
 * @swagger
 * /api/venta/{id}:
 *   get:
 *     summary: Obtener venta por ID
 *     tags: [Ventas]
 *     description: Endpoint para obtener una venta específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getVentaById);

module.exports = router;