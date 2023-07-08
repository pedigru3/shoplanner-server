import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateShoppingListItemUseCase } from './create-shopping-list-item'
import { InMemoryShoppingListItemsRepository } from '@/repositories/in-memory/in-memory-shopping-list-items-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { InMemorytItemsRepository } from '@/repositories/in-memory/in-memory-items-repository'
import { Category } from '@/consts/enum-category'
import { InMemorytGlobalItemsRepository } from '@/repositories/in-memory/in-memory-global-items-repository'
import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { ShoppingListItemAlreadyExistsError } from '../errors/shopping-list-item-already-exists'

let globalItemRepository: GlobalItemRepository
let shoppingListItemRepository: ShoppingListItemsRepository
let priceRepository: PricesRepository
let itemsRepository: ItemsRepository
let sut: CreateShoppingListItemUseCase

describe('Create Shopping List Item Use Case', () => {
  beforeEach(() => {
    globalItemRepository = new InMemorytGlobalItemsRepository()
    shoppingListItemRepository = new InMemoryShoppingListItemsRepository()
    priceRepository = new InMemorytPricesRepository()
    itemsRepository = new InMemorytItemsRepository()
    sut = new CreateShoppingListItemUseCase(
      globalItemRepository,
      itemsRepository,
      priceRepository,
      shoppingListItemRepository,
    )
  })

  it('should be able to create a shopping list item', async () => {
    const { shoppingListItem } = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'shoppingListId-fake',
      userId: 'userId-fake',
    })

    expect(shoppingListItem.id).toEqual(expect.any(String))
  })

  it('should be able a user create a different shopping list item', async () => {
    const { shoppingListItem: shop1 } = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'shoppingListId-fake',
      userId: 'userId-fake',
    })

    const { shoppingListItem: shop2 } = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'shoppingListId-fake2',
      userId: 'userId-2',
    })

    expect(shop1.itemId).not.toEqual(shop2.itemId)
  })

  it('should not be able to create a shopping list item with same name', async () => {
    await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'shoppingListId-fake',
      userId: 'userId-fake',
    })

    await expect(() =>
      sut.execute({
        category: Category.Alimentos,
        name: 'arroz ',
        price: 20.0,
        quantity: 2,
        shoppingListId: 'shoppingListId-fake',
        userId: 'userId-fake',
      }),
    ).rejects.toBeInstanceOf(ShoppingListItemAlreadyExistsError)
  })

  it('should be get item with the same name in other lists', async () => {
    const item1 = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'shoppingListId',
      userId: 'userId-fake',
    })

    const item2 = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'other-list-id',
      userId: 'userId-fake',
    })

    expect(item1.shoppingListItem.itemId).toBe(item2.shoppingListItem.itemId)
  })

  it('should be show the price evolution', async () => {
    const item1 = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 18.0,
      quantity: 2,
      shoppingListId: 'shoppingListId',
      userId: 'userId-fake',
    })

    await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20.0,
      quantity: 2,
      shoppingListId: 'other-list-id',
      userId: 'userId-fake',
    })

    const prices = await priceRepository.findManyByItemId(
      item1.shoppingListItem.itemId,
    )

    expect(prices[0].value.toNumber()).toEqual(18)
    expect(prices[1].value.toNumber()).toEqual(20)
  })

  it('should be not able to create a price if equal zero', async () => {
    const item1 = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 0,
      quantity: 2,
      shoppingListId: 'shoppingListId',
      userId: 'userId-fake',
    })

    const prices = await priceRepository.findManyByItemId(
      item1.shoppingListItem.itemId,
    )

    expect(prices.length).toEqual(0)
    expect(item1.shoppingListItem.priceId).toEqual(null)
  })

  it('should be able to return a item forecast price', async () => {
    let date = new Date(2023, 0, 1)
    vi.setSystemTime(date)
    await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 18,
      quantity: 2,
      shoppingListId: 'shoppingListId',
      userId: 'userId-fake1',
    })

    date = new Date(2023, 2, 1)
    vi.setSystemTime(date)
    await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 20,
      quantity: 2,
      shoppingListId: 'shoppingListId-2',
      userId: 'userId-fake2',
    })

    date = new Date(2023, 5, 1)
    vi.setSystemTime(date)
    const { shoppingListItem } = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      price: 0,
      quantity: 2,
      shoppingListId: 'shoppingListId-2',
      userId: 'userId-fake',
    })

    expect(shoppingListItem.forecast.toNumber()).toEqual(23.12)
  })
})
