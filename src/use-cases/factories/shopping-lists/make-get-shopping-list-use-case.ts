import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { PrismaShoppingListItemsRepository } from '@/repositories/prisma/prisma-shopping-list-items-repository'
import { PrismaItemsRepository } from '@/repositories/prisma/prisma-items-repository'
import { PrismaPricesRepository } from '@/repositories/prisma/prisma-prices-repository'
import { GetShoppingListUseCase } from '@/use-cases/shopping-lists/get-shopping-list'

export function makeGetShoppingListUseCase() {
  const shoppingListRepository = new PrismaShoppingListsRepository()
  const shoppingListItemRepository = new PrismaShoppingListItemsRepository()
  const itemsRepository = new PrismaItemsRepository()
  const pricesRepository = new PrismaPricesRepository()

  const getShoppingListUseCase = new GetShoppingListUseCase(
    shoppingListRepository,
    shoppingListItemRepository,
    itemsRepository,
    pricesRepository,
  )

  return getShoppingListUseCase
}
