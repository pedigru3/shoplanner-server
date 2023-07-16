import { RecipesRepository } from '@/repositories/recipes-repository'

interface GetRecipeRequest {
  items: string[]
}

interface GetRecipeResponse {
  recipe: string
}

export class GetRecipeUseCase {
  constructor(private revenueRepository: RecipesRepository) {}

  async execute({ items }: GetRecipeRequest): Promise<GetRecipeResponse> {
    const recipe = await this.revenueRepository.get(items)

    return {
      recipe,
    }
  }
}
