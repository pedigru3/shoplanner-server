import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShoppingListItemsRepository } from '@/repositories/in-memory/in-memory-shopping-list-items-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { InMemorytItemsRepository } from '@/repositories/in-memory/in-memory-items-repository'
import { Category } from '@/consts/enum-category'
import { UpdateShoppingListItemUseCase } from './update-shopping-list-item'

let shoppingListItemRepository: ShoppingListItemsRepository
let priceRepository: PricesRepository
let itemsRepository: ItemsRepository
let sut: UpdateShoppingListItemUseCase

describe('Create Shopping List Item Use Case', () => {
  beforeEach(() => {
    shoppingListItemRepository = new InMemoryShoppingListItemsRepository()
    priceRepository = new InMemorytPricesRepository()
    itemsRepository = new InMemorytItemsRepository()
    sut = new UpdateShoppingListItemUseCase(
      itemsRepository,
      priceRepository,
      shoppingListItemRepository,
    )

    itemsRepository.create({
      category: Category.Alimentos,
      name: 'Arroz',
      id: 'arroz-item',
      userId: 'user-1',
    })

    priceRepository.create({
      itemId: 'arroz-item',
      value: 20,
      id: 'price-id',
    })

    shoppingListItemRepository.create({
      id: 'shopping-list-item-id',
      itemId: 'arroz-item',
      priceId: 'price-id',
      quantity: 2,
      shoppingListId: 'shopping-list-id',
      forecast: 10,
    })
  })

  it('should be able to update name of list item', async () => {
    const { shoppingListItem } = await sut.execute({
      shoppingListItemId: 'shopping-list-item-id',
      userId: 'user-1',
      item: {
        name: ' Macarrão',
        category: Category.Alimentos,
      },
    })

    const item = await itemsRepository.findByNameAndUserId('Macarrão', 'user-1')

    expect(shoppingListItem.itemId).not.toBe('arroz-item')
    expect(item?.name).toEqual('Macarrão')
  })

  it('should be able to update the category of list item', async () => {
    const { shoppingListItem } = await sut.execute({
      shoppingListItemId: 'shopping-list-item-id',
      userId: 'user-1',
      item: {
        name: 'Arroz',
        category: Category.Carnes,
      },
    })

    const item = await itemsRepository.findByNameAndUserId('Arroz', 'user-1')

    expect(shoppingListItem.itemId).toBe('arroz-item')
    expect(item?.category).toEqual('Carnes')
  })

  it('should be able to update the price of list item', async () => {
    const { shoppingListItem } = await sut.execute({
      shoppingListItemId: 'shopping-list-item-id',
      userId: 'user-1',
      price: 15,
    })

    const prices = await priceRepository.findManyByItemId(
      shoppingListItem.itemId,
    )

    expect(prices[0].value.toNumber()).toBe(15)
  })

  it('should be able to update the quantity of list item', async () => {
    const { shoppingListItem } = await sut.execute({
      shoppingListItemId: 'shopping-list-item-id',
      userId: 'user-1',
      quantity: 10,
    })

    expect(shoppingListItem.quantity.toNumber()).toBe(10)
  })
})
