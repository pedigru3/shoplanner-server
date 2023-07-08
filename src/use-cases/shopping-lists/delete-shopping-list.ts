import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface DeleteShoppingListUseCaseRequest {
  userId: string
  shoppingListId: string
}

interface DeleteShoppingListUseCaseResponse {
  hasItemBeenDeleted: Boolean
}

export class DeleteShoppingListUseCase {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute({
    userId,
    shoppingListId,
  }: DeleteShoppingListUseCaseRequest): Promise<DeleteShoppingListUseCaseResponse> {
    const shoppingList = await this.shoppingListsRepository.findById(
      shoppingListId,
    )

    if (!shoppingList) {
      throw new ResourceNotFoundError()
    }

    if (shoppingList?.userId !== userId) {
      throw new UnauthorizedError()
    }

    const hasItemBeenDeleted = await this.shoppingListsRepository.delete(
      shoppingListId,
    )

    return {
      hasItemBeenDeleted,
    }
  }
}
