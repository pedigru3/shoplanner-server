import { makeGetShoppingListUseCase } from '@/use-cases/factories/shopping-lists/make-get-shopping-list-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
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

  const shoppingList = await getShoppingListUseCase.execute({
    shoppingListId: id,
    userId: request.user.sub,
  })

  console.log(shoppingList)

  return reply.code(200).send(shoppingList)
}
