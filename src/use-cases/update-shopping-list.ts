import { ShoppingList } from '@prisma/client'
import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'

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
    const shoppingList: ShoppingList = await this.shoppingListRepository.update(
      {
        id: shoppingListId,
        name,
      },
    )

    return {
      shoppingList,
    }
  }
}
