import { Prisma, ShoppingList } from '.prisma/client'

export interface ShoppingListsRepository {
  findById(id: string): Promise<ShoppingList | null>
  update(data: Prisma.ShoppingListUpdateInput): Promise<ShoppingList>
  findMany(userId: string): Promise<ShoppingList[]>
  create(data: Prisma.ShoppingListUncheckedCreateInput): Promise<ShoppingList>
  delete(id: string): Promise<Boolean>
}
