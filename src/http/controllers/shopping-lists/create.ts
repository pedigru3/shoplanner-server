import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateShoppingListUseCase } from '@/use-cases/factories/make-create-shopping-list-use-cases'

export async function createShoppingListController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const borySchema = z.object({
    id: z.string().uuid().optional(),
    createdAt: z.date().optional(),
    marketId: z.string().optional(),
    name: z.string(),
  })

  const { name, id, createdAt, marketId } = borySchema.parse(request.body)

  const createShoppingListUseCase = makeCreateShoppingListUseCase()

  await createShoppingListUseCase.execute({
    id,
    createdAt,
    marketId,
    name,
    userId: request.user.sub,
  })

  return reply.code(200).send()
}
