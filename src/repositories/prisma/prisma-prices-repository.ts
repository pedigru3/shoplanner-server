import { Prisma, Price } from '@prisma/client'
import { PricesRepository } from '../price-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPricesRepository implements PricesRepository {
  async update(data: Prisma.PriceUncheckedUpdateInput): Promise<Price> {
    return await prisma.price.update({
      where: {
        id: data.id?.toString(),
      },
      data,
    })
  }

  async findById(id: string): Promise<Price | null> {
    return await prisma.price.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyByItemId(itemId: string): Promise<Price[]> {
    return await prisma.price.findMany({
      where: {
        itemId,
      },
    })
  }

  async create(data: Prisma.PriceUncheckedCreateInput): Promise<Price> {
    return await prisma.price.create({
      data,
    })
  }
}
