import { env } from '@/env'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDataBaseUrl(schema: string) {
  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()

    const dataBaseUrl = generateDataBaseUrl(schema)

    env.DATABASE_URL = dataBaseUrl
    process.env.DATABASE_URL = dataBaseUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
