import { prisma } from '../lib/prisma'

interface SearchItem {
  itemId: string
  shoppingListId: string
}

export async function findShoppingListItem({
  itemId,
  shoppingListId,
}: SearchItem) {
  const shoppingListItem = await prisma.shoppingListItem.findFirst({
    where: {
      shoppingListId,
      itemId,
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
  return shoppingListItem
}
