import { Prisma } from '@prisma/client'

export type ShoppingListItemUpdateInput =
  Prisma.ShoppingListItemUncheckedUpdateInput & {
    id?: string
  }
