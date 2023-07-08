import { randomUUID } from 'crypto'
import { GlobalItemRepository } from '../globalItemRepository'
import { GlobalItem, Prisma } from '@prisma/client'

export class InMemorytGlobalItemsRepository implements GlobalItemRepository {
  public items: GlobalItem[] = []

  async findByName(name: string): Promise<GlobalItem | null> {
    const globalItem = this.items.find((item) => item.name === name)
    return globalItem || null
  }

  async create(data: Prisma.GlobalItemCreateInput): Promise<GlobalItem> {
    const globalItem: GlobalItem = {
      id: data.id ?? randomUUID(),
      name: data.name,
    }
    this.items.push(globalItem)
    return globalItem
  }
}
