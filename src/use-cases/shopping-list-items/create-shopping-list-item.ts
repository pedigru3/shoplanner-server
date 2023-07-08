import { Item, Price, ShoppingListItem } from '@prisma/client'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { Category } from '@/consts/enum-category'
import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { ShoppingListItemAlreadyExistsError } from '../errors/shopping-list-item-already-exists'
import { getOrCreateGlobalItem } from './utils/get-or-create-global-item'
import { createForecast } from './utils/create-forecast'

interface CreateShoppingListItemUseCaseRequest {
  name: string
  category: Category
  quantity: number
  price: number
  userId: string
  shoppingListId: string
  createdAt?: string
}

interface CreateShoppingListItemUseCaseResponse {
  shoppingListItem: ShoppingListItem
}

export class CreateShoppingListItemUseCase {
  constructor(
    private globalItemRepository: GlobalItemRepository,
    private itemsRepository: ItemsRepository,
    private pricesRepository: PricesRepository,
    private shoppingListItemsRepository: ShoppingListItemsRepository,
  ) {}

  async execute({
    userId,
    name: nameNotTransformed,
    category,
    price: value,
    quantity,
    shoppingListId,
    createdAt,
  }: CreateShoppingListItemUseCaseRequest): Promise<CreateShoppingListItemUseCaseResponse> {
    const name = nameNotTransformed.toLowerCase().trimEnd()

    const globalItem = await getOrCreateGlobalItem({
      globalItemRepository: this.globalItemRepository,
      name,
    })

    // item for each user
    const doesItemAlreadyExists =
      await this.itemsRepository.findByNameAndUserId(name, userId)

    let item: Item

    if (doesItemAlreadyExists) {
      item = doesItemAlreadyExists
    } else {
      item = await this.itemsRepository.create({
        category,
        name,
        userId,
        globalItemId: globalItem.id,
      })
    }

    const doesShoppingListItemAlreadyExists =
      await this.shoppingListItemsRepository.findByItemId(item.id, userId)

    if (doesShoppingListItemAlreadyExists?.shoppingListId === shoppingListId) {
      throw new ShoppingListItemAlreadyExistsError()
    }

    let price: Price | null = null

    if (value > 0) {
      price = await this.pricesRepository.create({
        itemId: item.id,
        value,
      })
    }

    const forecast = await createForecast({
      globalItemId: globalItem.id,
      itemsRepository: this.itemsRepository,
      pricesRepository: this.pricesRepository,
    })

    const shoppingListItem = await this.shoppingListItemsRepository.create({
      itemId: item.id,
      priceId: price?.id ?? null,
      quantity,
      shoppingListId,
      createdAt,
      forecast,
    })

    return {
      shoppingListItem,
    }
  }
}
