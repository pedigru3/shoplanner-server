import { FastifyInstance } from 'fastify'
import z from 'zod'
import { categories } from '../consts/categories'
import { getOrCreateItem } from '../repository/getOrCreateItem'
import { findShoppingListItem } from '../repository/findShoppingListItem'
import { createShoppingListItem } from '../repository/createShoppingListItem'
import { prisma } from '../lib/prisma'
import { select } from '../consts/selectedShoppingListItem'

export async function shoppingListsItemsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/shopping-list-item/:shoppingListId', async (req, reply) => {
    try {
      const paramScheme = z.object({
        shoppingListId: z.string().uuid(),
      })

      const bodySchema = z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
        category: z.string().refine((value) => categories.includes(value)),
      })

      const { name, quantity, price, category } = bodySchema.parse(req.body)
      const { shoppingListId } = paramScheme.parse(req.params)

      const shoppingList = await prisma.shoppingList.findUniqueOrThrow({
        where: {
          id: shoppingListId,
        },
      })

      if (shoppingList.userId !== req.user.sub) {
        reply.status(401).send({ error: 'Unauthorized' })
      }

      const item = await getOrCreateItem({
        name,
        category,
        userId: req.user.sub,
      })

      // checks if already exists a shoppingListItem
      let shoppingListItem = await findShoppingListItem({
        itemId: item.id,
        shoppingListId,
      })

      if (shoppingListItem) {
        return reply.status(409).send({ error: 'item já criado:' })
      } else {
        shoppingListItem = await createShoppingListItem({
          itemId: item.id,
          price,
          quantity,
          shoppingListId,
        })
        return shoppingListItem
      }
    } catch (error) {
      console.log(error)
      return reply.status(400).send({ error })
    }
  })

  app.put('/shopping-list-item/:id', async (req, reply) => {
    try {
      const paramScheme = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramScheme.parse(req.params)

      const shoppingListItem = await prisma.shoppingListItem.findUniqueOrThrow({
        where: { id },
        include: { item: true },
      })

      if (shoppingListItem.item.userId !== req.user.sub) {
        console.log(shoppingListItem.item.userId)
        console.log(req.user.sub)
        return reply.status(401).send({ error: 'Unauthorized id' })
      }

      // verify body request
      const bodySchema = z.object({
        item: z
          .object({
            name: z.string(),
            category: z.string().refine((value) => categories.includes(value)),
          })
          .optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
      })

      const { item, price, quantity } = bodySchema.parse(req.body)

      if (item === undefined && price === undefined && quantity === undefined) {
        return reply.status(400).send({ error: 'no params' })
      }

      // update name
      if (item) {
        // get or create new item
        const newItem = await getOrCreateItem({
          category: item.category,
          name: item.name,
          userId: req.user.sub,
        })
        // verify if item exists in list
        const shoppingListItemRecovered = await findShoppingListItem({
          itemId: newItem.id,
          shoppingListId: shoppingListItem.shoppingListId,
        })

        if (shoppingListItemRecovered != null) {
          return reply.status(409).send({ error: 'item already exists' })
        }
        // need update price
        await prisma.price.update({
          where: {
            id: shoppingListItem.priceId,
          },
          data: {
            itemId: newItem.id,
            value: price,
          },
        })
        // update shoppingListItem
        const response = await prisma.shoppingListItem.update({
          where: {
            id,
          },
          data: {
            itemId: newItem.id,
          },
          select,
        })
        return response
      }
      // update price
      if (price) {
        const response = await prisma.price.update({
          where: {
            id: shoppingListItem.priceId,
          },
          data: {
            value: price,
          },
        })
        return response
      }
      // update quantity
      if (quantity) {
        const response = await prisma.shoppingListItem.update({
          where: {
            id,
          },
          data: {
            quantity,
          },
        })
        return response
      }
    } catch (error) {
      console.log(error)
      return reply.status(400).send({ error })
    }
  })

  app.delete('/shopping-list-item/:id', async (req, reply) => {
    try {
      const userId = req.user.sub

      const paramScheme = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramScheme.parse(req.params)

      const shoppingListItem = await prisma.shoppingListItem.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          item: {
            select: {
              userId: true,
            },
          },
        },
      })

      if (shoppingListItem.item.userId !== userId) {
        reply.status(401).send({ error: 'Unauthorized' })
      }

      const deletedItem = prisma.shoppingListItem.delete({
        where: {
          id,
        },
      })

      const deletedPrice = prisma.price.delete({
        where: {
          id: shoppingListItem.priceId,
        },
      })

      await prisma.$transaction([deletedItem, deletedPrice])
    } catch (error) {
      return reply.status(400).send({ error })
    }
  })
}
