import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import { get, getById, create, addProduct, deleteProduct, deleteCart } from '../controllers/carts.controller.js'
import { purcharse } from '../controllers/purcharse.controller.js'

const router = Router()

router.get('/', get)
router.get('/:cid', getById)

router.get('/:cid/purcharse', passportCall('jwt'), authorization('user'), purcharse)

router.post('/', passportCall('jwt'), authorization('user'), create)
router.put('/:cid/products/:pid', passportCall('jwt'), authorization('user'), addProduct)
router.delete('/:cid/products/:pid', passportCall('jwt'), authorization('user'), deleteProduct)
router.delete('/:cid', passportCall('jwt'), authorization('user'), deleteCart)

export default router
