import { beforeEach, describe, expect, it } from 'vitest'
import { CreateShoppingListUseCase } from './create-shopping-list'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'

let shoppingListRepository: InMemoryShoppingListsRepository
let sut: CreateShoppingListUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    shoppingListRepository = new InMemoryShoppingListsRepository()
    sut = new CreateShoppingListUseCase(shoppingListRepository)
  })

  it('should be able to create a shopping list', async () => {
    const { shoppingList } = await sut.execute({
      name: 'My Market',
      userId: '123',
    })

    expect(shoppingList.id).toEqual(expect.any(String))
  })
})
