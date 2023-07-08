import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private shoppingListRepository: ShoppingListsRepository,
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    await this.shoppingListRepository.create({
      name: 'Nome do Supermercado',
      userId: user.id,
    })

    return user
  }
}
