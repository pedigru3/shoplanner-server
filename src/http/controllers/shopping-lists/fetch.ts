import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchShoppingListsUseCase } from '@/use-cases/factories/make-fetch-shopping-lists-use-case copy'

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
