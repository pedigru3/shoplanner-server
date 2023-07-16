import { makeGetRecipe } from '@/use-cases/factories/recipes/make-get-recipe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getRecipeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRecipeUseCase = await makeGetRecipe()

  const bodyScheme = z.object({
    items: z.array(z.string()),
  })

  const { items } = bodyScheme.parse(request.body)

  const recipe = await getRecipeUseCase.execute({
    items,
  })

  console.log(recipe)

  return reply.code(200).send(recipe)
}
