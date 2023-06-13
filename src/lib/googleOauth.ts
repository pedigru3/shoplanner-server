import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
export async function verifyGoogle(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
  })
  const payload = ticket.getPayload()
  if (payload) {
    return payload
  } else {
    throw new Error('payload')
  }
}
