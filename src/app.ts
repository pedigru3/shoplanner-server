import fastify = require('fastify')
import { shoppingListsRoutes } from './routes/shoppingLists'
import { shoppingListsItemsRoutes } from './routes/shoppingListItems'
import { authRoutes } from './routes/auth'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { itemRoutes } from './routes/item'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: env.JWT_PASS,
})

app.register(appRoutes)
app.register(authRoutes)
app.register(itemRoutes)
app.register(shoppingListsRoutes)
app.register(shoppingListsItemsRoutes)

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
