import { Prisma, ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '../shopping-lists-repository'
import { prisma } from '@/lib/prisma'

export class PrismaShoppingListsRepository implements ShoppingListsRepository {
  async create(
    data: Prisma.ShoppingListUncheckedCreateInput,
  ): Promise<ShoppingList> {
    const { name, userId } = data

    const shoppingList = prisma.shoppingList.create({
      data: {
        name,
        userId,
      },
    })

    return shoppingList
  }
}
