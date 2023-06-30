import { Prisma, Item } from '.prisma/client'

export interface ItemsRepository {
  update(data: Prisma.ItemUpdateInput): Promise<Item>
  findByName(name: string): Promise<Item | null>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
}
