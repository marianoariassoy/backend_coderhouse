import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { login, logout } from '../controllers/sessions.controller.js'
import { forgotpassword, resetpassword, verifyToken } from '../controllers/forgotpassword.controller.js'

const router = Router()

router.post('/login', passportCall('login'), login)
router.get('/logout', passportCall('jwt'), logout)

router.post('/forgot-password', forgotpassword)
router.get('/reset-password/:id/:token', verifyToken)
router.post('/reset-password/:id/:token', resetpassword)

router.get('/current', passportCall('jwt'), (req, res) => {
  res.send(req.user)
})
router.get('/dashboard', passportCall('jwt'), authorization(), (req, res) => {
  res.send(req.user)
})

export default router
