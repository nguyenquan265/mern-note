const emitter = new EventEmitter()
emitter.setMaxListeners(0)
import express from 'express'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import bodyParser from 'body-parser'
import { corsOptions } from './config/cors.js'
import env from './config/env.js'
import { connectMongo } from './config/mongodb.js'
import typeDefs from './schema'
import resolvers from './resolvers'
import authorization from './middlewares/auth.middleware.js'
import './config/firebase.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { EventEmitter } from 'stream'

const app = express()
const httpServer = http.createServer(app)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/'
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})

const startServer = async () => {
  await server.start()
  app.use(
    cors(corsOptions),
    authorization,
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { uid: res.locals.uid }
      }
    })
  )
  await connectMongo()
  await new Promise((resolve) => httpServer.listen({ port: env.PORT }, resolve))

  console.log(`Server ready at http://localhost:${env.PORT}`)
}

startServer()
