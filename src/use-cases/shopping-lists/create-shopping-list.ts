import { ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'

interface CreateShoppingListUseCaseRequest {
  userId: string
  name: string
  id?: string
  createdAt?: Date
  marketId?: string
}

interface CreateShoppingListUseCaseResponse {
  shoppingList: ShoppingList
}

export class CreateShoppingListUseCase {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute({
    userId,
    name,
    id,
    createdAt,
    marketId,
  }: CreateShoppingListUseCaseRequest): Promise<CreateShoppingListUseCaseResponse> {
    const shoppingList = await this.shoppingListsRepository.create({
      id,
      createdAt,
      marketId,
      name,
      userId,
    })

    return {
      shoppingList,
    }
  }
}
