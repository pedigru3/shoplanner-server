import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { DeleteShoppingListUseCase } from '@/use-cases/shopping-lists/delete-shopping-list'

export function makeDeleteShoppingListUseCase() {
  const shoppingListRepository = new PrismaShoppingListsRepository()

  const deleteShoppingListUseCase = new DeleteShoppingListUseCase(
    shoppingListRepository,
  )

  return deleteShoppingListUseCase
}
