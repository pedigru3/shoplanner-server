import { GlobalItem, Prisma } from '@prisma/client'

export interface GlobalItemRepository {
  findByName(name: string): Promise<GlobalItem | null>
  create(data: Prisma.GlobalItemCreateInput): Promise<GlobalItem>
}
