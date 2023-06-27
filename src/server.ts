import 'dotenv/config'
import { app } from './app'

app
  .listen({
    host: process.env.PORT ? '0.0.0.0' : 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log('🚀 Http Server running')
  })
