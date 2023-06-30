import { Item, ShoppingListItem } from '@prisma/client'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { Category } from '@/consts/enum-category'
import { ShoppingListItemAlreadyExistsError } from './errors/shopping-list-item-already-exists'

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

    const doesItemAlreadyExists = await this.itemsRepository.findByName(name)

    let item: Item

    if (doesItemAlreadyExists) {
      item = doesItemAlreadyExists
    } else {
      item = await this.itemsRepository.create({
        category,
        name,
        userId,
      })
    }

    const doesShoppingListItemAlreadyExists =
      await this.shoppingListItemsRepository.findByItemId(item.id)

    if (doesShoppingListItemAlreadyExists?.shoppingListId === shoppingListId) {
      throw new ShoppingListItemAlreadyExistsError()
    }

    const price = await this.pricesRepository.create({
      itemId: item.id,
      value,
    })

    const shoppingListItem = await this.shoppingListItemsRepository.create({
      itemId: item.id,
      priceId: price.id,
      quantity,
      shoppingListId,
      createdAt,
    })

    return {
      shoppingListItem,
    }
  }
}
