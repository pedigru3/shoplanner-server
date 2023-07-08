import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '../middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Criação de usuário',
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'user name',
              examples: [{ name: 'Jonh Doe' }],
            },
            email: {
              type: 'string',
              description: 'user e-mail',
            },
            password: {
              type: 'string',
              description: 'user password',
            },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'null',
          },
        },
      },
    },
    register,
  )
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
