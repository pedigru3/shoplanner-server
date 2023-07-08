import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { CreateShoppingListUseCase } from '@/use-cases/shopping-lists/create-shopping-list'

export function makeCreateShoppingListUseCase() {
  const shoppingListRepository = new PrismaShoppingListsRepository()
  const createShoppingListUseCase = new CreateShoppingListUseCase(
    shoppingListRepository,
  )

  return createShoppingListUseCase
}
