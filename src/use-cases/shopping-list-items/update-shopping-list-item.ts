import { Item, ShoppingListItem } from '@prisma/client'
import { ShoppingListItemsRepository } from '@/repositories/shopping-list-items-repository'
import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { Category } from '@/consts/enum-category'
import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { getOrCreateGlobalItem } from './utils/get-or-create-global-item'

interface ItemRequest {
  name: string
  category: Category
}

interface UpdateShoppingListItemUseCaseRequest {
  userId: string
  shoppingListItemId: string
  item?: ItemRequest
  quantity?: number
  price?: number
}

interface UpdateShoppingListItemUseCaseResponse {
  shoppingListItem: ShoppingListItem
}

export class UpdateShoppingListItemUseCase {
  constructor(
    private globalItemRepository: GlobalItemRepository,
    private itemsRepository: ItemsRepository,
    private pricesRepository: PricesRepository,
    private shoppingListItemsRepository: ShoppingListItemsRepository,
  ) {}

  async execute({
    userId,
    item: itemRequest,
    price: value,
    quantity,
    shoppingListItemId,
  }: UpdateShoppingListItemUseCaseRequest): Promise<UpdateShoppingListItemUseCaseResponse> {
    let shoppingListItem = await this.shoppingListItemsRepository.findById(
      shoppingListItemId,
    )

    if (!shoppingListItem) {
      throw new ResourceNotFoundError()
    }

    let item: Item
    if (itemRequest) {
      const name = itemRequest.name.trim()
      const doesItemAlreadyExists = name
        ? await this.itemsRepository.findByNameAndUserId(name, userId)
        : null

      if (doesItemAlreadyExists) {
        item = doesItemAlreadyExists

        // update category if is different
        if (item.category !== itemRequest.category) {
          item = await this.itemsRepository.update({
            id: item.id,
            category: itemRequest.category,
          })
        }

        // update list
        shoppingListItem = await this.shoppingListItemsRepository.update({
          id: shoppingListItemId,
          itemId: item.id,
        })
      } else {
        // if item not exists, create one
        const globalItem = await getOrCreateGlobalItem({
          globalItemRepository: this.globalItemRepository,
          name,
        })

        item = await this.itemsRepository.create({
          name,
          category: itemRequest.category,
          userId,
          globalItemId: globalItem.id,
        })

        // update category if is different
        if (item.category !== itemRequest.category) {
          item = await this.itemsRepository.update({
            id: item.id,
            category: itemRequest.category,
          })
        }
        // update list
        shoppingListItem = await this.shoppingListItemsRepository.update({
          id: shoppingListItemId,
          itemId: item.id,
        })
      }
    }

    if (value) {
      if (shoppingListItem.priceId) {
        await this.pricesRepository.update({
          id: shoppingListItem.priceId,
          value,
        })
      } else {
        await this.pricesRepository.create({
          value,
          itemId: shoppingListItem.id,
        })
      }
    }

    if (quantity) {
      shoppingListItem = await this.shoppingListItemsRepository.update({
        id: shoppingListItemId,
        quantity,
      })
    }

    return {
      shoppingListItem,
    }
  }
}
