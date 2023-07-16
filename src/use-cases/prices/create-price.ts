import { Price } from '@prisma/client'
import { PricesRepository } from '@/repositories/price-repository'
import { InvalidValueError } from '../errors/invalid-value-error'

interface CreatePriceUseCaseRequest {
  value: number
  itemId: string
}

interface CreatePriceUseCaseResponse {
  price: Price
}

export class CreatePriceUseCase {
  constructor(private pricesRepository: PricesRepository) {}

  async execute({
    itemId,
    value,
  }: CreatePriceUseCaseRequest): Promise<CreatePriceUseCaseResponse> {
    let price: Price

    if (value > 0) {
      price = await this.pricesRepository.create({
        itemId,
        value,
      })
    } else {
      throw new InvalidValueError()
    }

    return {
      price,
    }
  }
}
