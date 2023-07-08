import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetShoppingListUseCase } from '@/use-cases/factories/make-get-shopping-list-use-case'
import { z } from 'zod'

export async function getShoppingListController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getShoppingListUseCase = makeGetShoppingListUseCase()

  const paramScheme = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramScheme.parse(request.params)

  const shoppingLists = await getShoppingListUseCase.execute({
    shoppingListId: id,
    userId: request.user.sub,
  })

  return reply.code(200).send(shoppingLists)
}
