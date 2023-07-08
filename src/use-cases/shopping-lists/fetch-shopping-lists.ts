import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { ShoppingList } from '@prisma/client'

interface FetchShoppingListsUseCaseRequest {
  userId: string
}

type FetchShoppingListsUseCaseResponse = ShoppingList[]

export class FetchShoppingListsUseCase {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute({
    userId,
  }: FetchShoppingListsUseCaseRequest): Promise<FetchShoppingListsUseCaseResponse> {
    const shoppingLists = await this.shoppingListsRepository.findMany(userId)
    return shoppingLists
  }
}
