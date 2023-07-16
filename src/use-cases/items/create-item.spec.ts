import { InMemorytItemsRepository } from '@/repositories/in-memory/in-memory-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateItemUseCase } from './create-item'
import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { InMemorytGlobalItemsRepository } from '@/repositories/in-memory/in-memory-global-items-repository'
import { Category } from '@/consts/enum-category'

let itemRepository: ItemsRepository
let globalItemRepository: GlobalItemRepository
let sut: CreateItemUseCase

describe('Create Item UseCase', () => {
  beforeEach(() => {
    itemRepository = new InMemorytItemsRepository()
    globalItemRepository = new InMemorytGlobalItemsRepository()
    sut = new CreateItemUseCase(globalItemRepository, itemRepository)
  })

  it('should be able to create a new item', async () => {
    const { item } = await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      userId: 'user-id',
    })
    expect(item.name).toEqual('arroz')
  })

  it('should be able to return same itemId', async () => {
    await sut.execute({
      category: Category.Alimentos,
      id: 'item-id',
      name: 'Arroz',
      userId: 'user-id',
    })

    const { item } = await sut.execute({
      category: Category.Alimentos,
      id: 'wrong-item-id',
      name: 'Arroz',
      userId: 'user-id',
    })

    expect(item.id).toEqual('item-id')
  })

  it('should be create a global item', async () => {
    await sut.execute({
      category: Category.Alimentos,
      name: 'Arroz',
      userId: 'user-id',
    })

    await sut.execute({
      category: Category.Alimentos,
      name: 'arroz',
      userId: 'user-id-2',
    })

    const globalItem = await globalItemRepository.findByName('arroz')

    expect(globalItem?.name).toEqual('arroz')
  })
})
