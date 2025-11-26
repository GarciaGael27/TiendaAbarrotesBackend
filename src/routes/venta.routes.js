const { Router } = require('express')
const router = Router();
const { getVentas, postVenta, getVentaById, deleteVenta } = require('../controllers/venta.controller')

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
 *     description: Recibe IDs de productos, busca sus precios actuales en la BD y registra la venta calculando el total automáticamente.
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VentaInput'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VentaResponse'
 *       404:
 *         description: Uno de los productos no fue encontrado en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El producto con ID 5 no existe"
 *       500:
 *         description: Error del servidor o validación de base de datos (Trigger)
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

/**
 * @swagger
 * /api/venta/{id}:
 *   delete:
 *     summary: Eliminar venta por ID
 *     tags: [Ventas]
 *     description: Endpoint para eliminar una venta específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Venta eliminada con éxito"
 *       404:
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Venta no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar venta"
 *                 det:
 *                   type: string
 */
router.delete('/:id', deleteVenta);

module.exports = router;