import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaShoppingListsRepository } from '@/repositories/prisma/prisma-shopping-lists-repository'
import { RegisterUseCase } from '@/use-cases/users/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const shoppingListRepository = new PrismaShoppingListsRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    shoppingListRepository,
  )

  return registerUseCase
}
