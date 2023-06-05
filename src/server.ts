import fastify = require('fastify')
import { shoppingListsRoutes } from './routes/shoppingLists'
import { shoppingListsItemsRoutes } from './routes/shoppingListItems'
import { authRoutes } from './routes/auth'
import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'csl_@!amHqjdfjvlxFKSLajiwqquauajz@3019',
})

app.register(authRoutes)
app.register(shoppingListsRoutes)
app.register(shoppingListsItemsRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log('🚀 Http Server running')
  })
