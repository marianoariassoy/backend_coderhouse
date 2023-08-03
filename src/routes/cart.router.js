import fs from 'node:fs/promises'
import { Router } from 'express'

const router = Router()
const file = './src/data/cart.json'
const data = await fs.readFile(file, 'utf-8')
const cart = data === '' ? [] : JSON.parse(data)

router.post('/', (req, res) => {
  const body = req.body

  const newCart = { ...body, id: 1 }
  res.json(newCart)
})

router.get('/:cid', (req, res) => {
  const { cid } = req.params
  res.send('carrito con id: ' + cid)
})

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid

  res.send('Se agrego el producto ' + productId + ' al carrito ' + cartId)
})

export default router
