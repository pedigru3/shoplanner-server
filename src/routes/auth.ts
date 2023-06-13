import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '../lib/prisma'
import { verifyGoogle } from '../lib/googleOauth'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req, reply) => {
    const bodySchema = z.object({
      code: z.string(),
    })
    const { code } = bodySchema.parse(req.body)

    try {
      const accessTokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        null,
        {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )
      if (accessTokenResponse.data.error) {
        return reply.status(400).send({
          error: accessTokenResponse.data.error_description,
        })
      }

      const { access_token } = accessTokenResponse.data

      const userResponse = await axios.get('http://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const userSchema = z.object({
        id: z.number().transform((value) => value.toString()),
        login: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
      })

      const userInfo = userSchema.parse(userResponse.data)

      let user = await prisma.user.findUnique({
        where: {
          providerId: userInfo.id,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            providerId: userInfo.id,
            login: userInfo.login,
            name: userInfo.name,
            avatarUrl: userInfo.avatar_url,
            shoppingLists: {
              create: {
                name: 'Lista de Compras',
              },
            },
          },
        })
      }

      const token = app.jwt.sign(
        {
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        {
          sub: user.id,
          expiresIn: '7 days',
        },
      )

      return {
        token,
      }
    } catch (error) {
      return reply.status(500).send(error)
    }
  })

  app.post('/register/google', async (req) => {
    const bodySchema = z.object({
      idToken: z.string(),
    })
    const body = bodySchema.parse(req.body)

    const payload = await verifyGoogle(body.idToken)

    const userSchema = z.object({
      sub: z.string(),
      email: z.string(),
      name: z.string(),
      picture: z.string().url(),
    })

    const userInfo = userSchema.parse(payload)

    let user = await prisma.user.findUnique({
      where: {
        providerId: userInfo.sub,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          providerId: userInfo.sub,
          login: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          shoppingLists: {
            create: {
              name: 'Lista de Compras',
            },
          },
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return { token }
  })
}
