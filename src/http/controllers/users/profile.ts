import { makeUserProfileUseCase } from '@/use-cases/factories/make-user-profile-use-cases'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
