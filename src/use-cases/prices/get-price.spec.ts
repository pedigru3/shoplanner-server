import { beforeEach, describe, expect, it } from 'vitest'
import { PricesRepository } from '@/repositories/price-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'
import { GetPriceUseCase } from './get-price'

let priceRepository: PricesRepository
let sut: GetPriceUseCase

describe('Get price usecase', () => {
  beforeEach(() => {
    priceRepository = new InMemorytPricesRepository()
    sut = new GetPriceUseCase(priceRepository)
  })

  it('should be able to get a price', async () => {
    priceRepository.create({
      id: 'price-id',
      value: 20,
      itemId: 'itemId',
    })

    const { price } = await sut.execute({
      priceId: 'price-id',
    })

    expect(price.value.toNumber()).toEqual(20)
  })
})
