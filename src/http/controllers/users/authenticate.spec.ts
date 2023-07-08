import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shold be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'Jonhdoe@exemple.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'Jonhdoe@exemple.com',
      password: '123456',
    })

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
