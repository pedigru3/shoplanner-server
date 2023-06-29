import { Item, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ItemsRepository } from '../items-repository'

export class InMemorytItemsRepository implements ItemsRepository {
  public items: Item[] = []

  async findByName(name: string): Promise<Item | null> {
    const foundItem = this.items.find((item) => item.name === name)
    return foundItem || null
  }

  async create(data: Prisma.ItemUncheckedCreateInput): Promise<Item> {
    const { category, name, userId, createdAt } = data
    const item: Item = {
      id: data.id ?? randomUUID(),
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: new Date(),
      category,
      name,
      userId,
    }

    this.items.push(item)

    return item
  }
}
