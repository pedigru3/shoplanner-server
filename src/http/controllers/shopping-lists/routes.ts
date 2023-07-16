import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { createShoppingListController } from './create'
import { updateShoppingListController } from './update'
import { getShoppingListController } from './get'
import { fetchShoppingListsController } from './fetch'
import { deleteShoppingListController } from './delete'

export async function ShoppingListsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/shopping-list', createShoppingListController)
  app.get('/shopping-lists', fetchShoppingListsController)
  app.get(
    '/shopping-list/:id',
    {
      schema: {
        tags: ['Shopping List'],
        description: 'Criação de lista de compra',
        params: {
          id: { type: 'string' },
        },
        headers: {
          Authorization: { type: 'string' },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string' },
              userId: { type: 'string' },
              name: { type: 'string' },
              createdAt: { type: 'string', format: 'date' },
              updatedAt: { type: 'string', format: 'date' },
              marketId: { type: 'string', format: 'uuid' },
            },
            exemples: [{ name: 'felipe' }],
          },
        },
      },
    },
    getShoppingListController,
  )
  app.put('/shopping-list/:id', updateShoppingListController)
  app.delete('/shopping-list/:id', deleteShoppingListController)
}
