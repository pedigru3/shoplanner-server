import { Prisma, ShoppingListItem } from '.prisma/client'
import { ShoppingListItemUpdateInput } from './types/prisma-types'

export interface ShoppingListItemsRepository {
  update(data: ShoppingListItemUpdateInput): Promise<ShoppingListItem>
  findById(id: string): Promise<ShoppingListItem | null>
  findManyByShoppingListId(shoppingListId: string): Promise<ShoppingListItem[]>
  findByItemId(itemId: string, userId: string): Promise<ShoppingListItem | null>
  create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem>
}
