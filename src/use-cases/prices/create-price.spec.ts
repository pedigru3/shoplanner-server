import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePriceUseCase } from './create-price'
import { PricesRepository } from '@/repositories/price-repository'
import { InMemorytPricesRepository } from '@/repositories/in-memory/in-memory-prices-repository'

let priceRepository: PricesRepository
let sut: CreatePriceUseCase

describe('Create price usecase', () => {
  beforeEach(() => {
    priceRepository = new InMemorytPricesRepository()
    sut = new CreatePriceUseCase(priceRepository)
  })

  it('should be able to create a new price', async () => {
    const { price } = await sut.execute({
      value: 20,
      itemId: 'itemId',
    })

    expect(price.value.toNumber()).toEqual(20)
  })
})
