import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateShoppingListUseCase } from '@/use-cases/factories/make-update-shopping-list-use-cases'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { UnauthorizedError } from '@/use-cases/errors/unauthorized-error'

export async function updateShoppingListController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const paramScheme = z.object({
    id: z.string().uuid(),
  })
  const bodySchema = z.object({
    name: z.string(),
  })
  const { name } = bodySchema.parse(req.body)

  const { id } = paramScheme.parse(req.params)

  try {
    const updateShoppingListUseCase = makeUpdateShoppingListUseCase()

    await updateShoppingListUseCase.execute({
      name,
      shoppingListId: id,
      userId: req.user.sub,
    })

    return reply.code(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: err.message })
    }
    if (err instanceof UnauthorizedError) {
      reply.status(401).send({ error: err.message })
    }
    throw err
  }
}
