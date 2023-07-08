import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'
import { FetchShoppingListsUseCase } from './fetch-shopping-lists'

let shoppingListRepository: InMemoryShoppingListsRepository
let sut: FetchShoppingListsUseCase

describe('Get Shopping Lists Use Case', () => {
  beforeEach(() => {
    shoppingListRepository = new InMemoryShoppingListsRepository()
    sut = new FetchShoppingListsUseCase(shoppingListRepository)
  })

  it('should be able to delete a shopping list', async () => {
    shoppingListRepository.create({
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

    const shoppingLists = await sut.execute({
      userId: '123',
    })

    expect(shoppingLists.length).toEqual(3)
  })
})
