import { Prisma, ShoppingListItem } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ShoppingListItemsRepository } from '../shopping-list-items-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryShoppingListItemsRepository
  implements ShoppingListItemsRepository
{
  public items: ShoppingListItem[] = []

  async findById(id: string): Promise<ShoppingListItem | null> {
    const shoppingListItem = this.items.find((item) => item.id === id)
    return shoppingListItem || null
  }

  async update(
    data: Prisma.ShoppingListItemUncheckedUpdateInput,
  ): Promise<ShoppingListItem> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index > -1) {
      const shoppingListItem: ShoppingListItem = {
        ...this.items[index],
        itemId: data.itemId?.toString() ?? this.items[index].itemId,
        priceId: data.priceId?.toString() ?? this.items[index].priceId,
        quantity: data.quantity
          ? new Prisma.Decimal(data.quantity.toString())
          : this.items[index].quantity,
      }
      this.items[index] = shoppingListItem
      return shoppingListItem
    } else {
      throw new ResourceNotFoundError()
    }
  }

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
      priceId: data.priceId ?? null,
      quantity: new Prisma.Decimal(data.quantity.toString()),
      shoppingListId: data.shoppingListId,
      forecast: new Prisma.Decimal(data.forecast.toString()),
    }

    this.items.push(shoppingListItem)

    return shoppingListItem
  }
}
