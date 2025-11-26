const { Router } = require('express')
const router = Router();
const { getEmpleados, postEmpleado, getEmpleadoById, deleteEmpleado, updateEmpleado } = require('../controllers/empleado.controller')

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de empleados
 */

/**
 * @swagger
 * /api/empleado:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     description: Endpoint para obtener la lista completa de empleados
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getEmpleados);

/**
 * @swagger
 * /api/empleado:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     description: Endpoint para registrar un nuevo empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Empleado guardado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error al crear el empleado
 */
router.post('/', postEmpleado);

/**
 * @swagger
 * /api/empleado/{id}:
 *   get:
 *     summary: Obtener empleado por CURP
 *     tags: [Empleados]
 *     description: Endpoint para obtener un empleado específico por su CURP
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: CURP del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getEmpleadoById);

/**
 * @swagger
 * /api/empleado/{curp}:
 *   delete:
 *     summary: Eliminar empleado por CURP
 *     tags: [Empleados]
 *     description: Endpoint para eliminar un empleado específico por su CURP
 *     parameters:
 *       - in: path
 *         name: curp
 *         schema:
 *           type: string
 *         required: true
 *         description: CURP del empleado (ej. GAGA950827HDFRRL09)
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Empleado con CURP GAGA950827HDFRRL09 eliminado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:curp', deleteEmpleado);

/**
 * @swagger
 * /api/empleado/{curp}:
 *   put:
 *     summary: Actualizar empleado por CURP
 *     tags: [Empleados]
 *     description: Endpoint para actualizar un empleado específico por su CURP
 *     parameters:
 *       - in: path
 *         name: curp
 *         schema:
 *           type: string
 *         required: true
 *         description: CURP del empleado (ej. GAGA950827HDFRRL09)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Empleado con CURP GAGA950827HDFRRL09 actualizado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:curp', updateEmpleado);

module.exports = router;