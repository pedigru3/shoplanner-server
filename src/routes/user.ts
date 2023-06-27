import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function userRoute(app: FastifyInstance) {
  app.post('/users', (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
      data: {
        name,
        login: email,
        password_hash: password,
      },
    })
  })
}
