import { Router } from 'express'
import { login, register, profile, products, logout } from '../controllers/views.controller.js'
const router = Router()

router.get('/', login)
router.get('/login', login)
router.get('/register', register)
router.get('/profile', profile)
router.get('/products', products)
router.get('/logout', logout)

export default router
