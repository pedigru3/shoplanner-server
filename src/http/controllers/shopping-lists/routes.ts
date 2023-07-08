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
  app.get('/shopping-list/:id', getShoppingListController)
  app.put('/shopping-list/:id', updateShoppingListController)
  app.delete('/shopping-list/:id', deleteShoppingListController)
}
