import { Price, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PricesRepository } from '../price-repository'

export class InMemorytPricesRepository implements PricesRepository {
  public items: Price[] = []

  async create(data: Prisma.PriceUncheckedCreateInput): Promise<Price> {
    const { createdAt, itemId, value } = data
    const item: Price = {
      id: data.id ?? randomUUID(),
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: new Date(),
      itemId,
      value: new Prisma.Decimal(value.toString()),
    }

    this.items.push(item)

    return item
  }
}
