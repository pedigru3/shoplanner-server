import { GlobalItemRepository } from '@/repositories/globalItemRepository'
import { GlobalItem } from '@prisma/client'

interface GetOrCreateGlobalItemRequest {
  globalItemRepository: GlobalItemRepository
  name: string
}

export async function getOrCreateGlobalItem(
  data: GetOrCreateGlobalItemRequest,
): Promise<GlobalItem> {
  const { globalItemRepository, name } = data

  const doesGlobalItemAlreadyExists = await globalItemRepository.findByName(
    name,
  )

  if (doesGlobalItemAlreadyExists) {
    return doesGlobalItemAlreadyExists
  } else {
    return await globalItemRepository.create({ name })
  }
}
