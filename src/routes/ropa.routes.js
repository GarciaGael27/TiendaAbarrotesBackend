const { Router } = require('express')
const router = Router();
const { getRopa, postRopa, getRopaById, deleteRopa, updateRopa } = require('../controllers/ropa.controller')

/**
 * @swagger
 * tags:
 *   name: Ropa
 *   description: Gestión de productos de ropa
 */

/**
 * @swagger
 * /api/ropa:
 *   get:
 *     summary: Obtener todos los productos de ropa
 *     tags: [Ropa]
 *     description: Endpoint para obtener la lista completa de productos de ropa
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ropa'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getRopa);

/**
 * @swagger
 * /api/ropa:
 *   post:
 *     summary: Crear un nuevo producto de ropa
 *     tags: [Ropa]
 *     description: Endpoint para crear un nuevo producto de ropa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ropa'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Prenda guardada con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Ropa'
 *       500:
 *         description: Error al crear el producto
 */
router.post('/', postRopa);

/**
 * @swagger
 * /api/ropa/{id}:
 *   get:
 *     summary: Obtener producto de ropa por ID
 *     tags: [Ropa]
 *     description: Endpoint para obtener un producto específico por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ropa'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getRopaById);

/**
 * @swagger
 * /api/ropa/{codigo_visual}:
 *   delete:
 *     summary: Eliminar producto de ropa por código visual
 *     tags: [Ropa]
 *     description: Endpoint para eliminar un producto de ropa específico por su código visual
 *     parameters:
 *       - in: path
 *         name: codigo_visual
 *         schema:
 *           type: string
 *         required: true
 *         description: Código visual del producto de ropa (ej. ROP-00001)
 *     responses:
 *       200:
 *         description: Producto de ropa eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto de ropa ROP-00001 eliminado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Ropa'
 *       404:
 *         description: Producto de ropa no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:codigo_visual', deleteRopa);

/**
 * @swagger
 * /api/ropa/{codigo_visual}:
 *   put:
 *     summary: Actualizar producto de ropa por código visual
 *     tags: [Ropa]
 *     description: Endpoint para actualizar un producto de ropa específico por su código visual
 *     parameters:
 *       - in: path
 *         name: codigo_visual
 *         schema:
 *           type: string
 *         required: true
 *         description: Código visual del producto de ropa (ej. ROP-00001)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ropa'
 *     responses:
 *       200:
 *         description: Producto de ropa actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto de ropa ROP-00001 actualizado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Ropa'
 *       404:
 *         description: Producto de ropa no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:codigo_visual', updateRopa);

module.exports = router;