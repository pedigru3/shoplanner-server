import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch Shopping List (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shold be able fetch shopping lists', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/shopping-list')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Planos',
      })

    await request(app.server)
      .post('/shopping-list')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mufato',
      })

    const response = await request(app.server)
      .get(`/shopping-lists`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toEqual(3)
  })
})
