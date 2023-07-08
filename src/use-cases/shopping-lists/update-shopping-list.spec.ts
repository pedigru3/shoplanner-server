import { beforeEach, describe, expect, it } from 'vitest'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { UpdateShoppingListUseCase } from './update-shopping-list'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'

let shoppingListRepository: ShoppingListsRepository
let sut: UpdateShoppingListUseCase

describe('Create Shopping List Item Use Case', () => {
  beforeEach(() => {
    shoppingListRepository = new InMemoryShoppingListsRepository()

    sut = new UpdateShoppingListUseCase(shoppingListRepository)

    shoppingListRepository.create({
      name: 'Market',
      id: 'market-id',
      userId: 'user-1',
    })
  })

  it('should be able to update name of list', async () => {
    const { shoppingList } = await sut.execute({
      shoppingListId: 'market-id',
      userId: 'user-1',
      name: 'New name of Market',
    })

    expect(shoppingList.name).toBe('New name of Market')
  })
})
