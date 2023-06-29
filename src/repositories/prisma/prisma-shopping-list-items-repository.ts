import { Prisma, ShoppingListItem } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ShoppingListItemsRepository } from '../shopping-list-items-repository'

export class PrismaShoppingListItemsRepository
  implements ShoppingListItemsRepository
{
  async findByItemId(itemId: string): Promise<ShoppingListItem | null> {
    const shoppingListItem = await prisma.shoppingListItem.findFirst({
      where: {
        itemId,
      },
    })
    return shoppingListItem
  }

  async create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem> {
    const { itemId, quantity, priceId, shoppingListId } = data

    const shoppingListItem = await prisma.shoppingListItem.create({
      data: {
        quantity,
        priceId,
        itemId,
        shoppingListId,
      },
    })

    return shoppingListItem
  }
}
