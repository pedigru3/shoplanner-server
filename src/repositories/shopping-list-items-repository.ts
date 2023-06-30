import { Prisma, ShoppingListItem } from '.prisma/client'

export interface ShoppingListItemsRepository {
  update(
    data: Prisma.ShoppingListItemUncheckedUpdateInput,
  ): Promise<ShoppingListItem>
  findById(itemId: string): Promise<ShoppingListItem | null>
  findByItemId(itemId: string): Promise<ShoppingListItem | null>
  create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem>
}
