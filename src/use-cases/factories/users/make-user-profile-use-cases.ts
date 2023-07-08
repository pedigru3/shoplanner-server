import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile'

export function makeUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
