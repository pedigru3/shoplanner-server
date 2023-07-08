import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('shold be able to authenticate', async () => {
    await userRepository.create({
      email: 'jonhdoe@exemple.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jonhdoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shold not be able authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'jonhdoe@exemple.com',
      name: 'Jonh Doe',
      password_hash: await hash('1234567', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonhdoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shold not be able authenticate with wrong email', async () => {
    await userRepository.create({
      email: 'jonhdoe@exemple.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonhdoes@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
