import { confirmOrder, createOrder, getOrderById, getOrders, updateOrderStatus } from '../controllers/order/order.js'
import { verifyToken } from '../middleware/auth.js'

export const orderRoutes = async (fastify, options) => {
  fastify.addHook('preHandler', async (req, res) => {
    const isAuth = await verifyToken(req, res)
    if (!isAuth) {
      return res.code(401).send({ message: 'Unauthenticated' })
    }
  })

  fastify.get('/order', getOrders)
  fastify.get('order/:orderId', getOrderById)
  fastify.post('/order', createOrder)
  fastify.patch('/order/:orderId/status', updateOrderStatus)
  fastify.put('order/:orderId/confirm', confirmOrder)
}
