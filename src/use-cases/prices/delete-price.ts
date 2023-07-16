import { PricesRepository } from '@/repositories/price-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeletePriceUseCaseRequest {
  priceId: string
}

export class DeletePriceUseCase {
  constructor(private pricesRepository: PricesRepository) {}

  async execute({ priceId }: DeletePriceUseCaseRequest): Promise<boolean> {
    const price = await this.pricesRepository.findById(priceId)
    if (!price) {
      throw new ResourceNotFoundError()
    }
    await this.pricesRepository.delete(priceId)
    return true
  }
}
