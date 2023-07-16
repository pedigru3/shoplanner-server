import { Price } from '@prisma/client'
import { PricesRepository } from '@/repositories/price-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPriceUseCaseRequest {
  priceId: string
}

interface GetPriceUseCaseResponse {
  price: Price
}

export class GetPriceUseCase {
  constructor(private pricesRepository: PricesRepository) {}

  async execute({
    priceId,
  }: GetPriceUseCaseRequest): Promise<GetPriceUseCaseResponse> {
    const price = await this.pricesRepository.findById(priceId)

    if (!price) {
      throw new ResourceNotFoundError()
    }

    return {
      price,
    }
  }
}
