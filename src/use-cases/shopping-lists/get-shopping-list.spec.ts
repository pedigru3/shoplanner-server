import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'
import { GetShoppingListUseCase } from './get-shopping-list'
import { InMemoryShoppingListItemsRepository } from '@/repositories/in-memory/in-memory-shopping-list-items-repository'
import { InMemorytItemsRepository } from '@/repositories/in-memory/in-memory-items-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'

let shoppingListRepository: InMemoryShoppingListsRepository
let shoppingListItemRepository: ShoppingListItemsRepository
let itemsRepository: ItemsRepository
let pricesRepository: PricesRepository
let sut: GetShoppingListUseCase

describe('Get Shopping Lists Use Case', () => {
  beforeEach(() => {
    shoppingListRepository = new InMemoryShoppingListsRepository()
    shoppingListItemRepository = new InMemoryShoppingListItemsRepository()
    itemsRepository = new InMemorytItemsRepository()
    pricesRepository = new InMemorytPricesRepository()
    sut = new GetShoppingListUseCase(
      shoppingListRepository,
      shoppingListItemRepository,
      itemsRepository,
      pricesRepository,
    )
  })

  it('should be able to get a shopping list', async () => {
    shoppingListRepository.create({
      id: '20',
      name: 'Big',
      userId: '123',
    })

    shoppingListRepository.create({
      name: 'Carrefour',
      userId: '123',
    })

    shoppingListRepository.create({
      name: 'Max',
      userId: '123',
    })

    itemsRepository.create({
      id: '10',
      category: 'Alimentos',
      globalItemId: 'global',
      name: 'Arroz',
      userId: '123',
    })

    shoppingListItemRepository.create({
      shoppingListId: '20',
      forecast: 10,
      itemId: '10',
      quantity: 2,
    })

    const shoppingList = await sut.execute({
      shoppingListId: '20',
      userId: '123',
    })

    expect(shoppingList.name).toEqual('Big')
    expect(shoppingList.shoppingListItems[0].item.name).toEqual('Arroz')
  })
})
