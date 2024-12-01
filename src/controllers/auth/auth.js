import jwt from 'jsonwebtoken'
import { Customer, DeliveryPartner } from '../../models/user.model.js'

const generateToken = user => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
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

export const loginDeliveryPartner = async (req, res) => {
    try {
      const { email,password } = req.body
  
      let deliveryPartner = await DeliveryPartner.findOne({ email })
  
      if (!deliveryPartner) {
        // send error!
        return res.status(404).json({ message: 'Delivery Partner not found' })
       
      }

      const isMatch = deliveryPartner.password === password

      if(!isMatch){
        return res.status(404).json({ message: 'Password is incorrect' })
      }

  
      const { accessToken, refreshToken } = generateToken(deliveryPartner)
  
      res
        .status(200)
        .json({ accessToken, refreshToken, deliveryPartner,message: ' Login Successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }