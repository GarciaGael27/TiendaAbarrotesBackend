const { Router } = require('express')
const router = Router();
const { getLimpieza, postLimpieza, getLimpiezaById, deleteLimpieza, updateLimpieza } = require('../controllers/limpieza.controller')

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
 *     summary: Obtener producto de limpieza por código visual
 *     tags: [Limpieza]
 *     description: Endpoint para obtener un producto de limpieza específico por su código visual
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Código visual del producto de limpieza (ej. LIM-00001)
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

/**
 * @swagger
 * /api/limpieza/{codigo_visual}:
 *   delete:
 *     summary: Eliminar producto de limpieza por código visual
 *     tags: [Limpieza]
 *     description: Endpoint para eliminar un producto de limpieza específico por su código visual
 *     parameters:
 *       - in: path
 *         name: codigo_visual
 *         schema:
 *           type: string
 *         required: true
 *         description: Código visual del producto de limpieza (ej. LIM-00001)
 *     responses:
 *       200:
 *         description: Producto de limpieza eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto de limpieza LIM-00001 eliminado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Limpieza'
 *       404:
 *         description: Producto de limpieza no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:codigo_visual', deleteLimpieza);

/**
 * @swagger
 * /api/limpieza/{codigo_visual}:
 *   put:
 *     summary: Actualizar producto de limpieza por código visual
 *     tags: [Limpieza]
 *     description: Endpoint para actualizar un producto de limpieza específico por su código visual
 *     parameters:
 *       - in: path
 *         name: codigo_visual
 *         schema:
 *           type: string
 *         required: true
 *         description: Código visual del producto de limpieza (ej. LIM-00001)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Limpieza'
 *     responses:
 *       200:
 *         description: Producto de limpieza actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto de limpieza LIM-00001 actualizado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Limpieza'
 *       404:
 *         description: Producto de limpieza no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:codigo_visual', updateLimpieza);

module.exports = router;