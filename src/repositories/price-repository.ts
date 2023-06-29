import { Prisma, Price } from '.prisma/client'

export interface PricesRepository {
  // findByName(name: string): Promise<ShoppingList | null>
  create(data: Prisma.PriceUncheckedCreateInput): Promise<Price>
}
