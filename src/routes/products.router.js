import fs from 'node:fs/promises'
import { Router } from 'express'

const router = Router()
const file = './src/data/products.json'
const data = await fs.readFile(file, 'utf-8')
const products = data === '' ? [] : JSON.parse(data)

router.get('/', (req, res) => {
  const { limit } = req.query
  res.json(products.slice(0, limit))
})

router.get('/:pid', (req, res) => {
  const { pid } = req.params
  res.json(products.filter((x) => x.id === pid))
})

router.post('/', (req, res) => {
  const body = req.body
  const id = parseInt(products[products.length - 1].id) + 1
  const newProduct = { id, ...body, status: true }
  products.push(newProduct)
  res.json(products)
})

router.put('/:pid', (req, res) => {
  const { pid } = req.params
  const body = req.body

  const newProducts = products.map((x) => (x.id === pid ? { ...x, ...body } : x))

  res.json(newProducts)
})

router.delete('/:pid', (req, res) => {
  const { pid } = req.params

  const newProducts = products.map((x) => x.id !== pid)

  res.json(newProducts)
})

export default router
