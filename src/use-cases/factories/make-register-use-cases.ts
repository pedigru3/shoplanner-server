import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'
import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const shoppingListRepository = new PrismaShoppingListsRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    shoppingListRepository,
  )

  return registerUseCase
}
