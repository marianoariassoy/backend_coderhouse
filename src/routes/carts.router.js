import { Router } from 'express'
import { cartsModel } from '../models/carts.model.js'
const router = Router()

router.get('/', async (req, res) => {
  const result = await cartsModel.find().populate('products.product')
  res.send({ status: 'success', payload: result })
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  const result = await cartsModel.find({ _id: cid }).populate('products.product')
  res.send({ status: 'success', payload: result })
})

router.post('/', async (req, res) => {
  const result = await cartsModel.create({})
  res.send({ status: 'success', payload: result })
})

router.put('/:cid', async (req, res) => {
  const { cid } = req.params
  const { product } = req.body
  const cart = await cartsModel.find({ _id: cid })

  if (cart.length > 0) {
    const products = cart[0].products || []

    if (products.length > 0) {
      const find = products.find(x => x.product == product)
      if (find) {
        find.quantity++
      } else {
        products.push({ product, quantity: 1 })
      }
    } else {
      products.push({ product, quantity: 1 })
    }

    await cartsModel.updateOne({ _id: cid }, { products })
    res.send({ status: 'success', payload: cart })
  } else res.status(404).json({ message: 'Cart not found' })
})

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const { quantity } = req.body
  const cart = await cartsModel.find({ _id: cid })

  if (cart.length > 0) {
    const products = cart[0].products

    if (products.length > 0) {
      const find = products.find(x => x.product == pid)
      if (find) {
        find.quantity = quantity
        await cartsModel.updateOne({ _id: cid }, { products })
        res.send({ status: 'success', payload: cart })
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
    } else {
      res.status(404).json({ message: 'Products not found' })
    }
  } else res.status(404).json({ message: 'Cart not found' })
})

export default router

router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const cart = await cartsModel.find({ _id: cid })

  if (cart.length > 0) {
    const products = cart[0].products
    if (products.length > 0) {
      const result = products.filter(x => x.product != pid)
      await cartsModel.updateOne({ _id: cid }, { products: result })
      res.send({ status: 'product deleted', payload: cart })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } else res.status(404).json({ message: 'Cart not found' })
})

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params
  const cart = await cartsModel.find({ _id: cid })

  if (cart.length > 0) {
    await cartsModel.updateOne({ _id: cid }, { products: [] })
    res.send({ status: 'product deleted', payload: cart })
  } else res.status(404).json({ message: 'Cart not found' })
})
