import { RecipesRepository } from '../recipes-repository'

export class InMemoryRecipesRepository implements RecipesRepository {
  async get(data: string[]): Promise<string> {
    return `Receita de ${data[0]}`
  }
}
