import fastify from 'fastify'
import { connectDB } from './src/config/connect.js'

import "dotenv/config"
import { admin, buildAdminRouter } from './src/config/steup.js'

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  const app = fastify()
  await buildAdminRouter(app);
  app.listen(3000,
    (err, addr) => {
      if (err) {
        console.log(err)
        process.exit(1)
      } else {
        console.log(`Server listening at ${addr+admin.options.rootPath}`)
      }
    }
  )
}

start()
