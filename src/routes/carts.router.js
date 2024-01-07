import { Router } from 'express'
import { passportCall, authorization } from '../middlewares/middlewares.js'
import {
  getAllCarts,
  getCartById,
  createCart,
  addProduct,
  deleteProduct,
  deleteCart
} from '../controllers/carts.controller.js'
import { purcharse } from '../controllers/purcharse.controller.js'

const router = Router()

router.get('/', getAllCarts)
router.get('/:cid', getCartById)
router.put('/:cid/products/:pid', addProduct)
router.delete('/:cid/products/:pid', deleteProduct)

router.post('/', passportCall('jwt'), authorization('user'), createCart)
router.delete('/:cid', passportCall('jwt'), authorization('admin'), deleteCart)
router.get('/:cid/purcharse', passportCall('jwt-header'), purcharse)

export default router
