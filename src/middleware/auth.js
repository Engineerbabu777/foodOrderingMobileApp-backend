import jwt from 'jsonwebtoken'

export const verifyToken = async (req, reply) => {
  try {
    const authHeader = req.headers('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(403).send({ message: 'Token is not valid' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded

    return decoded
  } catch (error) {
    return reply.status(403).send({ message: 'Token is not valid' })
  }
}
