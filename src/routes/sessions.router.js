import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { login } from '../controllers/sessions.controller.js'

const router = Router()

router.post('/login', passportCall('login'), login)

router.get('/current', passportCall('jwt'), (req, res) => {
  res.send(req.user)
})

router.get('/dashboard', passportCall('jwt'), authorization(), (req, res) => {
  res.send(req.user)
})

router.get('/logout', async (req, res) => {
  res.clearCookie('jwt-cookie')
  res.send({ status: 'Logged out' })
})

export default router
