import { Router } from 'express'
import { readFile, writeFile } from '../utils/fs.js'

const router = Router()
const file = './src/data/cart.json'
const fileProducts = './src/data/products.json'

router.post('/', async (req, res) => {
  const body = req.body
  const data = await readFile(file)
  const id = data.length === 0 ? 1 : parseInt(data[data.length - 1].id) + 1
  data.push({ id, ...body })
  await writeFile(data, file)
  res.status(201).json(data)
})

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params

  const data = await readFile(file)
  const cart = data.filter((x) => x.id === parseInt(cid))
  const product = cart[0].products

  const findProduct = product.find((x) => x.id === parseInt(pid))

  if (findProduct) {
    const productSelected = product.filter((x) => x.id === parseInt(pid))
    productSelected[0].quantity++
  } else {
    product.push({ id: parseInt(pid), quantity: 1 })
  }

  await writeFile(data, file)
  res.status(200).json(product)
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  const cartProducts = []

  const data = await readFile(file)
  const cart = data.filter((x) => x.id === parseInt(cid))

  if (cart.length > 0) {
    const products = await readFile(fileProducts)

    cart[0].products.forEach((x) => {
      const product = products.filter((item) => item.id === parseInt(x.id))
      cartProducts.push(product)
    })

    res.status(200).json(cartProducts)
  } else res.status(404).json({ message: 'Cart not found' })
})

export default router
