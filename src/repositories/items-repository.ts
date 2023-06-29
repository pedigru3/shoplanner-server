import { Prisma, Item } from '.prisma/client'

export interface ItemsRepository {
  findByName(name: string): Promise<Item | null>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
}
