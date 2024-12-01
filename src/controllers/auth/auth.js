import jwt from 'jsonwebtoken'

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
