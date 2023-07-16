import { makeFetchShoppingListsUseCase } from '@/use-cases/factories/shopping-lists/make-fetch-shopping-lists-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchShoppingListsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchShoppingListUseCase = makeFetchShoppingListsUseCase()

  const shoppingLists = await fetchShoppingListUseCase.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send(shoppingLists)
}
