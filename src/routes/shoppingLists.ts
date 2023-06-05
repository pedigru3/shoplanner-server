import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import z from 'zod'
import { select } from '../consts/selectedShoppingListItem'

export async function shoppingListsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/shopping-lists', async (req) => {
    const userId = req.user.sub

    const result = await prisma.shoppingList.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })

    return result
  })

  app.get('/shopping-list/:id', async (req, reply) => {
    try {
      const paramScheme = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramScheme.parse(req.params)
      const result = await prisma.shoppingList.findUniqueOrThrow({
        where: {
          id,
        },
        select,
      })
      if (result.userId !== req.user.sub) {
        reply.status(401).send({ error: 'Unauthorized' })
      }
      return result
    } catch (error) {
      return reply.status(401).send({ error })
    }
  })

  app.post('/shopping-list', async (req) => {
    const borySchema = z.object({
      name: z.string(),
    })

    const { name } = borySchema.parse(req.body)

    try {
      const result = await prisma.shoppingList.create({
        data: {
          name,
          userId: req.user.sub,
        },
      })
      return result
    } catch (e) {
      return {
        error: e,
      }
    }
  })

  app.put('/shopping-list/:id', async (req, reply) => {
    const paramScheme = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string(),
    })
    const { name } = bodySchema.parse(req.body)

    const { id } = paramScheme.parse(req.params)

    let shoppingList = await prisma.shoppingList.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (shoppingList.userId !== req.user.sub) {
      reply.status(401).send({ error: 'Unauthorized' })
    }

    shoppingList = await prisma.shoppingList.update({
      data: {
        name,
      },
      where: {
        id,
      },
    })

    return shoppingList
  })

  app.delete('/shopping-list/:id', async (req, reply) => {
    const paramScheme = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramScheme.parse(req.params)
    try {
      const shoppingList = await prisma.shoppingList.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (shoppingList.userId !== req.user.sub) {
        reply.status(401).send({ error: 'Unauthorized' })
      }

      const deleteShoppingListItems = prisma.shoppingListItem.deleteMany({
        where: {
          shoppingListId: id,
        },
      })
      const deleteShoppingLists = prisma.shoppingList.delete({
        where: {
          id,
        },
        include: {
          ShoppingListItem: true,
        },
      })
      await prisma.$transaction([deleteShoppingListItems, deleteShoppingLists])
    } catch (error) {
      return reply.status(401).send({ error })
    }
  })
}
