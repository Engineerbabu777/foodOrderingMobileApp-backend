import { Branch } from '../../models/branch.model.js'
import Order from '../../models/order.model.js'
import { Customer } from '../../models/user.model.js'

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user

    const { items, branch, totalPrice } = req.body

    const customerData = await Customer.findById(userId)

    const branchData = await Branch.find(branch)

    if (!branchData) return res.status(404).send('Branch not found')

    if (!customerData) return res.status(404).send('Customer not found')

    const order = new Order({
      customer: userId,
      items: items.map(item => ({
        item: item.item,
        id: item.id,
        count: item.count
      })),
      branch: branchData,
      totalPrice: totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || 'No address available'
      },
      pickupLocation: {
        latitude: branchData.liveLocation.latitude,
        longitude: branchData.liveLocation.longitude,
        address: branchData.address || 'No address available'
      }
    })

    const savedOrder = await order.save()

    return res.status(200).send(savedOrder)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params

    const { userId } = req.user
    const { deliveryPersonLocation } = req.body

    const deliveryPerson = await DeliveryPerson.findById(userId)

    if (!deliveryPerson)
      return res.status(404).send('Delivery person not found')

    const order = await Order.findById(orderId)

    if (!order) return res.status(404).send('Order not found')

    if (order.status !== 'available') {
      return res.status(400).send('Order already confirmed')
    }

    order.deliveryPerson = userId
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation.latitude,
      longitude: deliveryPersonLocation.longitude,
      address: deliveryPersonLocation.address || ''
    }
    order.status = 'confirmed'

    await order.save()

    return res.status(200).send(order)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
  } catch (error) {}
}
