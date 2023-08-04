import fs from 'node:fs/promises'
import { Router } from 'express'

const router = Router()

const productsFile = './src/data/products.json'
const productsData = await fs.readFile(productsFile, 'utf-8')
let products = productsData === '' ? [] : JSON.parse(productsData)

router.get('/', (req, res) => {
  const { limit } = req.query
  res.json(products.slice(0, limit))
})

router.get('/:pid', (req, res) => {
  const { pid } = req.params
  res.json(products.filter((x) => x.id === +pid))
})

router.post('/', (req, res) => {
  const body = req.body
  const id = products.length === 0 ? 1 : parseInt(products[products.length - 1].id) + 1

  products.push({ id, ...body, status: true })
  res.json(products)
})

router.put('/:pid', (req, res) => {
  const { pid } = req.params
  const body = req.body

  const find = products.find((x) => x.id === +pid)
  products[products.indexOf(find)] = { ...find, ...body }

  res.json(products)
})

router.delete('/:pid', (req, res) => {
  const { pid } = req.params

  products = products.map((x) => x.id !== +pid)
  res.json(products)
})

export default router
