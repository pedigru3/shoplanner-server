import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { UnauthorizedError } from '@/use-cases/errors/unauthorized-error'
import { makeDeleteShoppingListUseCase } from '@/use-cases/factories/shopping-lists/make-delete-shopping-list-use-cases'

export async function deleteShoppingListController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const paramScheme = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramScheme.parse(req.params)

  try {
    const deleteShoppingListUseCase = makeDeleteShoppingListUseCase()

    await deleteShoppingListUseCase.execute({
      shoppingListId: id,
      userId: req.user.sub,
    })

    return reply.code(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: err.message })
    }
    if (err instanceof UnauthorizedError) {
      return reply.status(401).send({ error: err.message })
    }
    throw err
  }
}
