import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { CreateShoppingListUseCase } from './create-shopping-list'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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

  it('should not be able to create a shopping list with a inexistent user', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0))

    await expect(() =>
      sut.execute({
        name: 'My Market',
        userId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
