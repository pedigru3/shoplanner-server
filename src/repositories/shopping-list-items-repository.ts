import { Prisma, ShoppingListItem } from '.prisma/client'

export interface ShoppingListItemsRepository {
  findByItemId(itemId: string): Promise<ShoppingListItem | null>
  create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem>
}
