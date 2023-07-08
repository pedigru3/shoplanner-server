import { Prisma, Item } from '.prisma/client'

export interface ItemsRepository {
  update(data: Prisma.ItemUpdateInput): Promise<Item>
  findById(id: string): Promise<Item | null>
  findManyByGlobalId(globalItemId: string): Promise<Item[]>
  findByNameAndUserId(name: string, userId: string): Promise<Item | null>
  searchManyByName(name: string): Promise<Item[]>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
}
