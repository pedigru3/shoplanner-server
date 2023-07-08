import { Prisma, Item } from '@prisma/client'
import { ItemsRepository } from '../items-repository'
import { prisma } from '@/lib/prisma'

export class PrismaItemsRepository implements ItemsRepository {
  async update(data: Prisma.ItemUpdateInput): Promise<Item> {
    return await prisma.item.update({
      where: {
        id: data.id?.toString(),
      },
      data,
    })
  }

  async findById(id: string): Promise<Item | null> {
    return await prisma.item.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyByGlobalId(globalItemId: string): Promise<Item[]> {
    return await prisma.item.findMany({
      where: {
        globalItemId,
      },
    })
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Item | null> {
    return await prisma.item.findFirst({
      where: {
        userId,
        name,
      },
    })
  }

  async searchManyByName(name: string): Promise<Item[]> {
    return await prisma.item.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
    })
  }

  async create(data: Prisma.ItemUncheckedCreateInput): Promise<Item> {
    return await prisma.item.create({
      data,
    })
  }
}
