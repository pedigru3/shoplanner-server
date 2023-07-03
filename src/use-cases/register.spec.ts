import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { InMemoryShoppingListsRepository } from '@/repositories/in-memory/in-memory-shopping-lists-repository'

let usersRepository: InMemoryUsersRepository
let shoppingListRepository: ShoppingListsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    shoppingListRepository = new InMemoryShoppingListsRepository()
    sut = new RegisterUseCase(usersRepository, shoppingListRepository)
  })

  it('shold be able to register', async () => {
    const user = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shold hash user password upon registration', async () => {
    const user = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    })

    const isPassowordCorretlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPassowordCorretlyHashed).toBe(true)
  })

  it('shold not be able to register with same e-mail', async () => {
    const email = 'jonhdoe@exemple.com'

    await sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Esley Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('shold not be create a list with register', async () => {
    const email = 'jonhdoe@exemple.com'

    const user = await sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    const shoppingLists = await shoppingListRepository.findMany(user.id)

    expect(shoppingLists[0].name).toEqual('Nome do Supermercado')
  })
})
