import { usersServices } from '../repositories/index.js'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { sendmagiclink } from '../utilities/mailing.js'
import { isValidatePassword } from '../utils.js'

export const forgotpassword = async (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).send({ status: 'error', error: 'email is required' })

  const user = await usersServices.getByEmail(email)
  if (!user) return res.status(404).send({ status: 'error', error: 'user not found' })

  const secret = config.jwtSecret + user.password
  const payload = {
    email: user.email,
    id: user._id
  }
  const token = jwt.sign(payload, secret, { expiresIn: '60m' })
  const link = `http://localhost:8080/reset-password/${user._id}/${token}`

  console.log(link)
  sendmagiclink(user.email, link)
  res.send(`Password reset link has been sent to the email ${user.email}`)
}

export const verifyToken = async (req, res) => {
  const { id, token } = req.params

  const user = await usersServices.getById(id)
  if (!user) return res.status(404).send({ status: 'error', error: 'user not found' })

  const secret = config.jwtSecret + user.password
  try {
    const payload = jwt.verify(token, secret)
    if (!payload) return res.status(401).send({ status: 'error', error: 'invalid token' })

    return res.send({ status: 'success', message: 'token valid' })
  } catch (error) {
    return res.status(401).send({ status: 'error', error })
  }
}

export const resetpassword = async (req, res) => {
  const { id, token } = req.params
  const password = req.body.password
  if (!password) return res.status(400).send({ status: 'error', error: 'password is required' })

  const user = await usersServices.getById(id)
  if (!user) return res.status(404).send({ status: 'error', error: 'user not found' })

  const secret = config.jwtSecret + user.password
  if (isValidatePassword(password, user.password)) {
    return res.status(400).send({ status: 'error', error: 'password cannot be the same' })
  }

  try {
    const payload = jwt.verify(token, secret)
    if (!payload) return res.status(401).send({ status: 'error', error: 'invalid token' })

    const result = await usersServices.edit(user._id, { ...user._doc, password })
    if (!result) return res.status(400).send({ status: 'error', error: 'password not updated' })

    return res.send({ status: 'success', message: 'password updated' })
  } catch (error) {
    return res.status(401).send({ status: 'error', error })
  }
}
