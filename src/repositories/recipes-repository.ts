export interface RecipesRepository {
  get(data: string[]): Promise<string>
}
