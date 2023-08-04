import fs from 'node:fs/promises'
import { Router } from 'express'

const router = Router()

const cartFile = './src/data/cart.json'
const cartData = await fs.readFile(cartFile, 'utf-8')
const cart = cartData === '' ? [] : JSON.parse(cartData)

const productsFile = './src/data/products.json'
const productsData = await fs.readFile(productsFile, 'utf-8')
const products = productsData === '' ? [] : JSON.parse(productsData)

let id = 1

router.post('/', (req, res) => {
  const body = req.body
  const newCart = { id, ...body }
  cart.push(newCart)
  res.json(cart)
  id++
})

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid

  const cartSelected = cart.filter((x) => x.id === parseInt(cartId))
  const product = cartSelected[0].products

  if (product.length === 0) {
    product.push({ id: parseInt(productId), quantity: 1 })
  } else {
    const productSelected = product.filter((x) => x.id === parseInt(productId))
    productSelected[0].quantity++
  }

  res.json(cart)
})

router.get('/:cid', (req, res) => {
  const { cid } = req.params
  const cartSelected = cart.filter((x) => x.id === parseInt(cid))
  const cartProducts = []

  cartSelected[0].products[0].forEach((x) => {
    const product = products.filter((item) => item.id === x.id)
    cartProducts.push(product[0])
  })
  res.json(cartProducts)
})

export default router
