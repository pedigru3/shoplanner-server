import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { UpdateShoppingListUseCase } from '@/use-cases/shopping-lists/update-shopping-list'

export function makeUpdateShoppingListUseCase() {
  const shoppingListRepository = new PrismaShoppingListsRepository()
  const updateShoppingListUseCase = new UpdateShoppingListUseCase(
    shoppingListRepository,
  )

  return updateShoppingListUseCase
}
