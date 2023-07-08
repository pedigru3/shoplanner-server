import { InMemorytGlobalItemsRepository } from '@/repositories/in-memory/in-memory-global-items-repository'
import { PrismaItemsRepository } from '@/repositories/prisma/prisma-items-repository'
import { PrismaPricesRepository } from '@/repositories/prisma/prisma-prices-repository'
import { PrismaShoppingListItemsRepository } from '@/repositories/prisma/prisma-shopping-list-items-repository'
import { CreateShoppingListItemUseCase } from '@/use-cases/shopping-list-items/create-shopping-list-item'

export function makeCreateShoppingListItem() {
  const globalItemRepository = new InMemorytGlobalItemsRepository()
  const shoppingListItemRepository = new PrismaShoppingListItemsRepository()
  const priceRepository = new PrismaPricesRepository()
  const itemsRepository = new PrismaItemsRepository()

  const createShoppingListItemUseCase = new CreateShoppingListItemUseCase(
    globalItemRepository,
    itemsRepository,
    priceRepository,
    shoppingListItemRepository,
  )

  return createShoppingListItemUseCase
}
