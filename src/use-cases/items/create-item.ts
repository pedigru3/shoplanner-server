import { Item } from '@prisma/client'
import { ItemsRepository } from '@/repositories/items-repository'
import { Category } from '@/consts/enum-category'
import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { getOrCreateGlobalItem } from '../shopping-list-items/utils/get-or-create-global-item'

interface CreateItemUseCaseRequest {
  category: Category
  name: string
  userId: string
  id?: string
  createdAt?: Date
}

interface CreateItemUseCaseResponse {
  item: Item
}

export class CreateItemUseCase {
  constructor(
    private globalItemRepository: GlobalItemRepository,
    private itemsRepository: ItemsRepository,
  ) {}

  async execute({
    category,
    name: nameNotFormatted,
    userId,
    id,
    createdAt,
  }: CreateItemUseCaseRequest): Promise<CreateItemUseCaseResponse> {
    const name = nameNotFormatted.toLocaleLowerCase()

    const globalItem = await getOrCreateGlobalItem({
      globalItemRepository: this.globalItemRepository,
      name,
    })

    let item: Item | null

    item = await this.itemsRepository.findByNameAndUserId(name, userId)

    if (item) {
      return { item }
    } else {
      item = await this.itemsRepository.create({
        id,
        createdAt,
        category,
        globalItemId: globalItem.id,
        name,
        userId,
      })

      return {
        item,
      }
    }
  }
}
