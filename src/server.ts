import fastify = require('fastify')
import { shoppingListsRoutes } from './routes/shoppingLists'
import { shoppingListsItemsRoutes } from './routes/shoppingListItems'
import { authRoutes } from './routes/auth'
import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'
import { itemRoutes } from './routes/item'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: process.env.JWT_PASS ?? 'default@dpldz.cakpregister',
})

app.register(authRoutes)
app.register(itemRoutes)
app.register(shoppingListsRoutes)
app.register(shoppingListsItemsRoutes)

app
  .listen({
    host: process.env.PORT ? '0.0.0.0' : 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log('🚀 Http Server running')
  })
