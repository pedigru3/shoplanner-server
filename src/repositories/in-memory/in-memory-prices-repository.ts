import { Price, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PricesRepository } from '../price-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemorytPricesRepository implements PricesRepository {
  public items: Price[] = []

  async findById(id: string): Promise<Price | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async update(data: Prisma.PriceUncheckedUpdateInput): Promise<Price> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index > -1) {
      const price: Price = {
        ...this.items[index],
        itemId: data.itemId?.toString() ?? this.items[index].itemId,
        value: data.value
          ? new Prisma.Decimal(data.value?.toString())
          : this.items[index].value,
      }
      this.items[index] = price
      return price
    } else {
      throw new ResourceNotFoundError()
    }
  }

  async findManyByItemId(itemId: string): Promise<Price[]> {
    const prices = this.items.filter((item) => item.itemId === itemId)
    return prices
  }

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
