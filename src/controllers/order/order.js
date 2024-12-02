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
