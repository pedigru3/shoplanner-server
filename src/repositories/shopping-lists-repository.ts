import { Prisma, ShoppingList } from '.prisma/client'

export interface ShoppingListsRepository {
  // findByName(name: string): Promise<ShoppingList | null>
  create(data: Prisma.ShoppingListUncheckedCreateInput): Promise<ShoppingList>
}
