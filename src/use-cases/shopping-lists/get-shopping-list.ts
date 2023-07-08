import { ShoppingListsRepository } from '@/repositories/shopping-lists-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { Price } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

interface GetShoppingListUseCaseRequest {
  userId: string
  shoppingListId: string
}

interface PriceResponse {
  id: string
  value: Decimal
  createdAt: Date
}

interface ItemResponse {
  id: string
  name: string
  category: string
  prices: PriceResponse[]
  createdAt: Date
}

interface ShoppingListItemResponse {
  createdAt: Date
  id: string
  currentPrice?: Price
  quantity: Decimal
  item: ItemResponse
}

interface ShoppingListResponse {
  id: string
  userId: string
  name: string
  createdAt: Date
  marketId: string | null
  shoppingListItems: ShoppingListItemResponse[]
}

export class GetShoppingListUseCase {
  constructor(
    private shoppingListsRepository: ShoppingListsRepository,
    private shoppingListItemsRepository: ShoppingListItemsRepository,
    private itemsRepository: ItemsRepository,
    private pricesRepository: PricesRepository,
  ) {}

  async execute({
    userId,
    shoppingListId,
  }: GetShoppingListUseCaseRequest): Promise<ShoppingListResponse> {
    const shoppingList = await this.shoppingListsRepository.findById(
      shoppingListId,
    )

    if (!shoppingList) {
      throw new ResourceNotFoundError()
    }

    if (shoppingList.userId !== userId) {
      throw new UnauthorizedError()
    }

    const shoppingListItemsFormated: ShoppingListItemResponse[] = []

    const shoppingListItems =
      await this.shoppingListItemsRepository.findManyByShoppingListId(
        shoppingListId,
      )
    for (const shoppingListItem of shoppingListItems) {
      const itemId = shoppingListItem.itemId
      const priceId = shoppingListItem.priceId

      let price: Price | null = null

      if (priceId) {
        price = await this.pricesRepository.findById(priceId)
      }

      const prices = await this.pricesRepository.findManyByItemId(itemId)
      const item = await this.itemsRepository.findById(itemId)

      if (!item) {
        throw new ResourceNotFoundError()
      }

      const result: ShoppingListItemResponse = {
        id: shoppingListItem.id,
        quantity: shoppingListItem.quantity,
        item: {
          category: item.category,
          createdAt: item.createdAt,
          id: item.id,
          name: item.name,
          prices,
        },
        createdAt: shoppingListItem.createdAt,
        currentPrice: price || undefined,
      }
      shoppingListItemsFormated.push(result)
    }

    return {
      ...shoppingList,
      shoppingListItems: shoppingListItemsFormated,
    }
  }
}
