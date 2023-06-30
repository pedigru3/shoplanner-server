import { Prisma, Price } from '.prisma/client'

export interface PricesRepository {
  update(data: Prisma.PriceUncheckedUpdateInput): Promise<Price>
  findManyByItemId(itemId: string): Promise<Price[]>
  create(data: Prisma.PriceUncheckedCreateInput): Promise<Price>
}
