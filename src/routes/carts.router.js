import { Router } from 'express'
import {
  getAllCarts,
  getCart,
  createCart,
  addProduct,
  editProduct,
  deleteProduct,
  deleteCart
} from '../controllers/carts.controller.js'
const router = Router()

router.get('/', getAllCarts)
router.get('/:cid', getCart)
router.post('/', createCart)
router.put('/:cid', addProduct)
router.put('/:cid/products/:pid', editProduct)
router.delete('/:cid/products/:pid', deleteProduct)
router.delete('/:cid', deleteCart)

export default router
