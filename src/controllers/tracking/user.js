import { Customer } from '../../models/user.model'

export const updateUser = async (req, res) => {
  try {
    // get userId!
    const { userId } = req.user
    const updateData = req.body

    // find that from both delivery and customer!
    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId))

    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    let UserModel
    if (user.role === 'Customer') {
      UserModel = Customer
    } else {
      UserModel = DeliveryPartner
    }

    // update the user!
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found!' })
    }

    return res
      .status(200)
      .send({ message: 'User updated successfully!', user: updatedUser })
  } catch (error) {
    return res.status(404).send({ message: error.message })
  }
}
