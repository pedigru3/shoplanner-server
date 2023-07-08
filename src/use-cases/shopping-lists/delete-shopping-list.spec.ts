import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'
import { DeleteShoppingListUseCase } from './delete-shopping-list'

let shoppingListRepository: InMemoryShoppingListsRepository
let sut: DeleteShoppingListUseCase

describe('Delete Shopping List Use Case', () => {
  beforeEach(() => {
    shoppingListRepository = new InMemoryShoppingListsRepository()
    sut = new DeleteShoppingListUseCase(shoppingListRepository)
  })

  it('should be able to delete a shopping list', async () => {
    shoppingListRepository.create({
      id: '123',
      name: 'market',
      userId: '123',
    })

    const { hasItemBeenDeleted } = await sut.execute({
      userId: '123',
      shoppingListId: '123',
    })

    expect(hasItemBeenDeleted).toEqual(true)
  })
})
