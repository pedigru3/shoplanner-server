import { Prisma, ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '../shopping-lists-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryShoppingListsRepository
  implements ShoppingListsRepository
{
  public items: ShoppingList[] = []

  async findMany(userId: string): Promise<ShoppingList[]> {
    const shoppingLists = this.items.filter((item) => item.userId === userId)
    return shoppingLists
  }

  async update(data: Prisma.ShoppingListUpdateInput): Promise<ShoppingList> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index > -1) {
      const shoppingList: ShoppingList = {
        ...this.items[index],
        name: data.name?.toString() ?? this.items[index].name,
      }
      return shoppingList
    } else {
      throw new ResourceNotFoundError()
    }
  }

  async create(
    data: Prisma.ShoppingListUncheckedCreateInput,
  ): Promise<ShoppingList> {
    const shoppingList: ShoppingList = {
      id: data.id ?? randomUUID(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '10',
    }

    this.items.push(shoppingList)

    return shoppingList
  }
}
