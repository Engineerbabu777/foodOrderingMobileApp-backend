import fastify from 'fastify'
import { connectDB } from './src/config/connect.js'

import "dotenv/config"
import { admin, buildAdminRouter } from './src/config/steup.js'
import { registerRoutes } from './src/routes/index.js'
import fastifySocketIO from 'fastify-socket.io'

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  const app = fastify()

  app.register(fastifySocketIO,{
    cors:{
      origin:"*"
    },
    pingTimeout:5000,
    pingInterval:10000,
    transports:["websocket"]
  });





  await registerRoutes(app)
  await buildAdminRouter(app)
  app.listen(3000,
    (err, addr) => {
      if (err) {
        console.log(err)
        process.exit(1)
      } else {
        console.log(`Server listening at ${addr+admin.options.rootPath}`)
      }
    }
  );

  app.ready(err => {
    if (err) throw err
    app.io.on('connection', socket => {
      console.log('a user connected')

      socket.on("joinRoom",(orderId) => {
        socket.join(orderId)
      console.log(`user ${socket.id} joined room ${orderId}`)
      })

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  })
}

start()
