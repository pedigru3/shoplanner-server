import { Prisma, ShoppingList } from '.prisma/client'

export interface ShoppingListsRepository {
  update(data: Prisma.ShoppingListUpdateInput): Promise<ShoppingList>
  findMany(userId: string): Promise<ShoppingList[]>
  create(data: Prisma.ShoppingListUncheckedCreateInput): Promise<ShoppingList>
}
