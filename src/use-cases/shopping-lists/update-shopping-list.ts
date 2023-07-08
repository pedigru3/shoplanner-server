import { ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface UpdateShoppingListUseCaseRequest {
  userId: string
  shoppingListId: string
  name?: string
}

interface UpdateShoppingListUseCaseResponse {
  shoppingList: ShoppingList
}

export class UpdateShoppingListUseCase {
  constructor(private shoppingListRepository: ShoppingListsRepository) {}

  async execute({
    userId,
    shoppingListId,
    name,
  }: UpdateShoppingListUseCaseRequest): Promise<UpdateShoppingListUseCaseResponse> {
    let shoppingList = await this.shoppingListRepository.findById(
      shoppingListId,
    )

    if (!shoppingList) {
      throw new ResourceNotFoundError()
    }

    if (shoppingList.userId !== userId) {
      throw new UnauthorizedError()
    }

    shoppingList = await this.shoppingListRepository.update({
      id: shoppingListId,
      name,
    })

    return {
      shoppingList,
    }
  }
}
