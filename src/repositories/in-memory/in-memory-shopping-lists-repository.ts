import { Prisma, ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '../shopping-lists-repository'
import { randomUUID } from 'crypto'

export class InMemoryShoppingListsRepository
  implements ShoppingListsRepository
{
  public items: ShoppingList[] = []

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
