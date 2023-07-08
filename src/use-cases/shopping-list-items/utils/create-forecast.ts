import { ItemsRepository } from '@/repositories/items-repository'
import { PricesRepository } from '@/repositories/price-repository'
import { generatePredict } from '@/utils/regression'
import { Price } from '@prisma/client'

interface CreateForecastParams {
  itemsRepository: ItemsRepository
  pricesRepository: PricesRepository
  globalItemId: string
}

export async function createForecast(
  data: CreateForecastParams,
): Promise<number> {
  const { globalItemId, itemsRepository, pricesRepository } = data
  let pricesReference: Price[] = []
  const itemsReference = await itemsRepository.findManyByGlobalId(globalItemId)

  for (const item of itemsReference) {
    const newPrices = await pricesRepository.findManyByItemId(item.id)
    pricesReference = [...pricesReference, ...newPrices]
  }

  const prices = pricesReference.map((e) => e.value.toNumber())
  const dates = pricesReference.map((e) => e.createdAt)
  return generatePredict(prices, dates)
}
