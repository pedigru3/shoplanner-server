import { prisma } from '../lib/prisma'

interface ShoppingListItemParams {
  price: number
  itemId: string
  quantity: number
  shoppingListId: string
  forecast: number
}

export async function createShoppingListItem({
  price,
  itemId,
  quantity,
  shoppingListId,
  forecast,
}: ShoppingListItemParams) {
  // to create the list is necessary create a price
  const result = await prisma.$transaction(async (prisma) => {
    const currentPrice = await prisma.price.create({
      data: {
        value: price,
        itemId,
      },
    })

    const newShoppingListItem = await prisma.shoppingListItem.create({
      data: {
        priceId: currentPrice.id,
        itemId,
        quantity,
        shoppingListId,
        forecast,
      },
      select: {
        createdAt: true,
        id: true,
        quantity: true,
        currentPrice: {
          select: {
            id: true,
            value: true,
            createdAt: true,
          },
        },
        item: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
            prices: {
              select: {
                id: true,
                value: true,
                createdAt: true,
              },
            },
          },
        },
      },
    })

    return newShoppingListItem
  })

  return result
}
