import fastify = require('fastify')
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { ShoppingListsRoutes } from './http/controllers/shopping-lists/routes'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifySwagger } from '@fastify/swagger'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_PASS,
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Shopplanner API',
      description: 'Essa API é uma API para planejamento de compras',
      version: '1.0.0',
      contact: {
        name: 'Felipe',
        email: 'contosdefereira@hotmail.com',
      },
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
})

app.addHook('preHandler', (request, reply, done) => {
  const referer = request.headers.referer
  const isSwaggerRequest =
    referer && referer.includes('/documentation/static/index.html')

  if (isSwaggerRequest) {
    // A requisição está vindo do Swagger
    console.log('Requisição do Swagger')
  }

  done()
})

app.register(usersRoutes)
app.register(ShoppingListsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we shold log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
