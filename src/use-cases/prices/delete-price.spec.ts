import { beforeEach, describe, expect, it } from 'vitest'
import { PricesRepository } from '@/repositories/price-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'
import { DeletePriceUseCase } from './delete-price'

let priceRepository: PricesRepository
let sut: DeletePriceUseCase

describe('Delete price usecase', () => {
  beforeEach(() => {
    priceRepository = new InMemorytPricesRepository()
    sut = new DeletePriceUseCase(priceRepository)
  })

  it('should be able to delete a price', async () => {
    priceRepository.create({
      id: 'price-id',
      value: 20,
      itemId: 'itemId',
    })

    const result = await sut.execute({
      priceId: 'price-id',
    })

    expect(result).toEqual(true)
  })
})
