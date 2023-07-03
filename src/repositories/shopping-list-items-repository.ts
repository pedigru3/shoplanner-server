import { Prisma, ShoppingListItem } from '.prisma/client'
import { ShoppingListItemUpdateInput } from './types/prisma-types'

export interface ShoppingListItemsRepository {
  update(data: ShoppingListItemUpdateInput): Promise<ShoppingListItem>
  findById(id: string): Promise<ShoppingListItem | null>
  findByItemId(itemId: string): Promise<ShoppingListItem | null>
  create(
    data: Prisma.ShoppingListItemUncheckedCreateInput,
  ): Promise<ShoppingListItem>
}
