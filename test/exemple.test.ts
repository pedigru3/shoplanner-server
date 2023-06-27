import { beforeAll, afterAll, describe, it } from 'vitest'
import { app } from '../src/app'

describe('ShoppingLists routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.todo('shold be able create a new user', async () => {})
})
