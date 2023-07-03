import { Prisma, ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '../shopping-lists-repository'
import { prisma } from '@/lib/prisma'

export class PrismaShoppingListsRepository implements ShoppingListsRepository {
  async findById(id: string): Promise<ShoppingList | null> {
    const shoppingList = await prisma.shoppingList.findUnique({
      where: {
        id,
      },
    })
    return shoppingList
  }

  async update(data: Prisma.ShoppingListUpdateInput): Promise<ShoppingList> {
    const shoppingList = await prisma.shoppingList.update({
      where: {
        id: data.id?.toString(),
      },
      data: {
        name: data.name,
        sharedWith: data.sharedWith,
      },
    })
    return shoppingList
  }

  async findMany(userId: string): Promise<ShoppingList[]> {
    const shoppingLists = await prisma.shoppingList.findMany({
      where: {
        userId,
      },
    })
    return shoppingLists
  }

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
