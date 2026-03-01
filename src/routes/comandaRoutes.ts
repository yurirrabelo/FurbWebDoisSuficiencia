import { Router } from 'express';
import { getAll, getById, create, update, deleteComanda } from '../controllers/ComandaController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /comandas:
 *   get:
 *     tags:
 *       - Comandas
 *     summary: Listar todas as comandas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comandas
 *       400:
 *         description: Token inválido ou ausente
 */
router.get('/', authMiddleware, getAll);

/**
 * @swagger
 * /comandas/{id}:
 *   get:
 *     tags:
 *       - Comandas
 *     summary: Obter comanda por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da comanda
 *     responses:
 *       200:
 *         description: Dados da comanda
 *       400:
 *         description: Comanda não encontrada ou token inválido
 */
router.get('/:id', authMiddleware, getById);

/**
 * @swagger
 * /comandas:
 *   post:
 *     tags:
 *       - Comandas
 *     summary: Criar nova comanda
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *               - nomeCliente
 *               - telefoneCliente
 *             properties:
 *               idCliente:
 *                 type: integer
 *                 example: 1
 *               nomeCliente:
 *                 type: string
 *                 example: "João Silva"
 *               telefoneCliente:
 *                 type: string
 *                 example: "11999999999"
 *               produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: "Produto 1"
 *                     preco:
 *                       type: number
 *                       example: 50.00
 *     responses:
 *       200:
 *         description: Comanda criada com sucesso
 *       400:
 *         description: Dados inválidos ou token ausente
 */
router.post('/', authMiddleware, create);

/**
 * @swagger
 * /comandas/{id}:
 *   patch:
 *     tags:
 *       - Comandas
 *     summary: Adicionar/atualizar produtos da comanda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da comanda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "X-Galinha"
 *                     preco:
 *                       type: number
 *                       example: 27.5
 *     responses:
 *       200:
 *         description: Comanda atualizada com sucesso
 *       400:
 *         description: Comanda não encontrada ou produto inválido
 */
router.patch('/:id', authMiddleware, update);

/**
 * @swagger
 * /comandas/{id}:
 *   put:
 *     tags:
 *       - Comandas
 *     summary: Atualizar dados da comanda (nomeCliente, telefoneCliente)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da comanda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCliente:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               telefoneCliente:
 *                 type: string
 *                 example: "11988888888"
 *     responses:
 *       200:
 *         description: Comanda atualizada com sucesso
 *       400:
 *         description: Comanda não encontrada ou token inválido
 */
router.put('/:id', authMiddleware, update);

/**
 * @swagger
 * /comandas/{id}:
 *   delete:
 *     tags:
 *       - Comandas
 *     summary: Deletar comanda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da comanda
 *     responses:
 *       200:
 *         description: Comanda deletada com sucesso
 *       400:
 *         description: Comanda não encontrada ou token inválido
 */
router.delete('/:id', authMiddleware, deleteComanda);

export { router as comandaRoutes };