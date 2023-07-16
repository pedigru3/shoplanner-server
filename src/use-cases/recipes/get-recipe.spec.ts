import { beforeEach, describe, expect, it } from 'vitest'
import { GetRecipeUseCase } from './get-recipe'
import { RecipesRepository } from '@/repositories/recipes-repository'
import { InMemoryRecipesRepository } from '@/repositories/in-memory/in-memory-recipes-repository'

let revenuesRepository: RecipesRepository
let sut: GetRecipeUseCase

describe('Get price usecase', () => {
  beforeEach(() => {
    revenuesRepository = new InMemoryRecipesRepository()
    sut = new GetRecipeUseCase(revenuesRepository)
  })

  it('should be able to get a revenue', async () => {
    const response = await sut.execute({
      items: [
        'Maçã',
        'Arroz',
        'Carne bovina',
        'Leite',
        'Banana',
        'Ovos',
        'Alface',
        'Pão',
        'Frango',
        'Cenoura',
      ],
    })

    console.log(response)

    expect(response).toEqual({ recipe: 'Receita de Maçã' })
  })
})
