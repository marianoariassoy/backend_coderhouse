import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { login } from '../controllers/sessions.controller.js'

const router = Router()

router.get('/', (req, res) => {
  res.send('Welcome to sessions')
})

router.post('/login', passportCall('login'), login)

router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
  res.send(req.user)
})

router.get('/dashboard', passportCall('jwt'), authorization('admin'), (req, res) => {
  res.send(req.user)
})

router.get('/logout', async (req, res) => {
  res.clearCookie('jwt-cookie')
  res.send('Logged out')
})

export default router
