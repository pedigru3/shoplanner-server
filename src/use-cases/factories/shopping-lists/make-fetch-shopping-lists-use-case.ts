import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { FetchShoppingListsUseCase } from '@/use-cases/shopping-lists/fetch-shopping-lists'

export function makeFetchShoppingListsUseCase() {
  const shoppingListRepository = new PrismaShoppingListsRepository()

  const getShoppingListUseCase = new FetchShoppingListsUseCase(
    shoppingListRepository,
  )

  return getShoppingListUseCase
}
