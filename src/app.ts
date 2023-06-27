import fastify = require('fastify')
import { shoppingListsRoutes } from './routes/shoppingLists'
import { shoppingListsItemsRoutes } from './routes/shoppingListItems'
import { authRoutes } from './routes/auth'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { itemRoutes } from './routes/item'

export const app = fastify()

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
