import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get a Shopping List (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shold be able to get a shopping list', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/shopping-list')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'c612cc36-428a-4b9f-ade4-ce5249846c77',
        name: 'Big',
      })

    const response = await request(app.server)
      .get(`/shopping-list/c612cc36-428a-4b9f-ade4-ce5249846c77`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Big',
      }),
    )
  })
})
