import { Prisma, Item } from '.prisma/client'

export interface ItemsRepository {
  update(data: Prisma.ItemUpdateInput): Promise<Item>
  findByNameAndUserId(name: string, userId: string): Promise<Item | null>
  searchManyByName(name: string): Promise<Item[]>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
}
