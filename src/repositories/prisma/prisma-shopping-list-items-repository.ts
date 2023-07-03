import { Prisma, ShoppingListItem } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ShoppingListItemsRepository } from '../shopping-list-items-repository'
import { ShoppingListItemUpdateInput } from '../types/prisma-types'

export class PrismaShoppingListItemsRepository
  implements ShoppingListItemsRepository
{
  async update(data: ShoppingListItemUpdateInput): Promise<ShoppingListItem> {
    const { id, quantity, itemId, priceId } = data
    const shoppingListItem = await prisma.shoppingListItem.update({
      where: { id },
      data: { quantity, itemId, priceId },
    })
    return shoppingListItem
  }

  findById(id: string): Promise<ShoppingListItem | null> {
    throw new Error('Method not implemented.')
  }

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
    const { itemId, quantity, priceId, shoppingListId, forecast } = data

    const shoppingListItem = await prisma.shoppingListItem.create({
      data: {
        quantity,
        priceId,
        itemId,
        shoppingListId,
        forecast,
      },
    })

    return shoppingListItem
  }
}
