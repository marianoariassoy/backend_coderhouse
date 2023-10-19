import { Router } from 'express'
import {
  getAllCarts,
  getCartById,
  createCart,
  addProduct,
  deleteProduct,
  deleteCart
} from '../controllers/carts.controller.js'
const router = Router()

router.get('/', getAllCarts)
router.get('/:cid', getCartById)
router.post('/', createCart)
router.put('/:cid', addProduct)
router.delete('/:cid/products/:pid', deleteProduct)
router.delete('/:cid', deleteCart)

export default router
