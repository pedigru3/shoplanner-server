import { OpenAiRecipesRepository } from '@/repositories/open-ai/open-ai-recipes-repository'
import { GetRecipeUseCase } from '@/use-cases/recipes/get-recipe'

export async function makeGetRecipe() {
  const revenuesRepository = new OpenAiRecipesRepository()
  const getRecipeUseCase = new GetRecipeUseCase(revenuesRepository)

  return getRecipeUseCase
}
