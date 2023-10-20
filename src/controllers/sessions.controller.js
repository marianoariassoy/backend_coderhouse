import jwt from 'jsonwebtoken'
export const login = async (req, res) => {
  const { email, password } = req.body
  const token = jwt.sign({ email, password, role: 'user' }, process.env.JWT_SECRET)
  res.cookie('jwt-cookie', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  })
  res.send({ stutus: 'Logged in', token })
}
