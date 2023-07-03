import { Item, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ItemsRepository } from '../items-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemorytItemsRepository implements ItemsRepository {
  public items: Item[] = []

  async searchManyByName(name: string): Promise<Item[]> {
    const items = this.items.filter((item) => item.name.includes(name))
    return items
  }

  async update(data: Prisma.ItemUpdateInput): Promise<Item> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index > -1) {
      const item: Item = {
        ...this.items[index],
        category: data.category?.toString() ?? this.items[index].category,
      }

      this.items[index] = item
      return item
    } else {
      throw new ResourceNotFoundError()
    }
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Item | null> {
    const foundItem = this.items.find(
      (item) => item.name === name && item.userId === userId,
    )
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
