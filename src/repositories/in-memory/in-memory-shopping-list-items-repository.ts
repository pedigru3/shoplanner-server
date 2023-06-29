import { Prisma, ShoppingListItem } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ShoppingListItemsRepository } from '../shopping-list-items-repository'

export class InMemoryShoppingListItemsRepository
  implements ShoppingListItemsRepository
{
  public items: ShoppingListItem[] = []

  async findByItemId(itemId: string): Promise<ShoppingListItem | null> {
    const shoppingListItem = this.items.find((item) => item.itemId === itemId)
    return shoppingListItem || null
  }

  async create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem> {
    const shoppingListItem: ShoppingListItem = {
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      itemId: data.itemId,
      priceId: data.priceId,
      quantity: new Prisma.Decimal(data.quantity.toString()),
      shoppingListId: data.shoppingListId,
    }

    this.items.push(shoppingListItem)

    return shoppingListItem
  }
}
