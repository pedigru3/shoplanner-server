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
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['users'],
        description: 'Criação de sessão',
        body: {
          type: 'object',
          properties: {
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
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
        },
      },
    },
    authenticate,
  )

  /** Authenticated */
  app.get(
    '/me',
    {
      schema: {
        tags: ['users'],
        description: 'Obter dados do usuário',
        headers: {
          Authorization: { type: 'string' },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                  avatarUrl: { type: 'string' },
                  createdAt: { type: 'string' },
                },
              },
            },
          },
        },
      },
      onRequest: [verifyJWT],
    },
    profile,
  )
}
