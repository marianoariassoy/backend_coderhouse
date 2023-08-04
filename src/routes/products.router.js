import { Router } from 'express'
import { readFile, writeFile } from '../utils/fs.js'

const router = Router()
const file = './src/data/products.json'

router.get('/', async (req, res) => {
  const { limit } = req.query
  const data = await readFile(file)
  const list = limit > 0 ? data.slice(0, +limit) : data

  res.status(200).json(list)
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const data = await readFile(file)
  const product = data.filter((x) => x.id === +pid)

  if (product.length === 0) res.status(404).json({ error: 'Product not found' })
  else res.status(200).json(product)
})

router.post('/', async (req, res) => {
  const body = req.body

  if (body.title && body.description && body.code && body.category && body.stock && body.price) {
    const data = await readFile(file)
    const id = data.length === 0 ? 1 : parseInt(data[data.length - 1].id) + 1
    data.push({ id, ...body, status: true })
    await writeFile(data, file)

    res.status(200).json(data)
  } else res.status(400).json({ error: 'All fields required' })
})

router.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const body = req.body
  const data = await readFile(file)
  const find = data.find((x) => x.id === +pid)

  if (find) {
    data[data.indexOf(find)] = { ...find, ...body }
    await writeFile(data, file)

    res.status(200).json(data)
  } else res.status(404).json({ error: 'Product not found' })
})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const data = await readFile(file)
  const find = data.find((x) => x.id === +pid)

  if (find) {
    const newData = data.filter((x) => x.id !== +pid)
    await writeFile(newData, file)

    res.status(200).json({ message: 'Product deleted' })
  } else res.status(404).json({ error: 'Product not found' })
})

export default router
