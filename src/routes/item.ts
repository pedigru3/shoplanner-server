import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function itemRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/item/:name', async (req, reply) => {
    try {
      const userId = req.user.sub

      const paramScheme = z.object({
        name: z.string(),
      })

      const { name } = paramScheme.parse(req.params)

      const suggestions = prisma.item.findMany({
        where: {
          userId,
          name: {
            startsWith: name.toUpperCase(),
          },
        },
      })

      return suggestions
    } catch (error) {
      return reply.status(400).send({ error })
    }
  })
}
