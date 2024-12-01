import jwt from 'jsonwebtoken'
import { Customer } from '../../models/user.model.js'

const generateToken = user => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  )

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )

  return { accessToken, refreshToken }
}

export const loginCustomer = async (req, res) => {
  try {
    const { phone } = req.body

    let customer = await Customer.findOne({ phone: phone })

    if (!customer) {
      customer = new Customer({
        phone: phone,
        role: 'customer',
        isActivated: true
      })

      await customer.save()
    }

    const { accessToken, refreshToken } = generateToken(customer)

    res
      .status(200)
      .json({ accessToken, refreshToken, message: ' Login Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
