import { Prisma, Price } from '.prisma/client'

export interface PricesRepository {
  update(data: Prisma.PriceUncheckedUpdateInput): Promise<Price>
  findById(id: string): Promise<Price | null>
  findManyByItemId(itemId: string): Promise<Price[]>
  create(data: Prisma.PriceUncheckedCreateInput): Promise<Price>
  delete(id: string): Promise<boolean>
}
