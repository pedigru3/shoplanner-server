import { ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'

interface CreateShoppingListUseCaseRequest {
  userId: string
  name: string
}

interface CreateShoppingListUseCaseResponse {
  shoppingList: ShoppingList
}

export class CreateShoppingListUseCase {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute({
    userId,
    name,
  }: CreateShoppingListUseCaseRequest): Promise<CreateShoppingListUseCaseResponse> {
    const shoppingList = await this.shoppingListsRepository.create({
      name,
      userId,
    })

    return {
      shoppingList,
    }
  }
}
