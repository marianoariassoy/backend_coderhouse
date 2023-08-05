import { Router } from 'express'
import { readFile, writeFile } from '../utils/fs.js'

const router = Router()
const file = './src/data/products.json'

router.get('/', async (req, res) => {
  const { limit } = req.query
  const data = await readFile(file)
  const list = limit > 0 ? data.slice(0, +limit) : data
  res.json(list)
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const data = await readFile(file)
  const product = data.find(x => x.id === +pid)
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' })
})

router.post('/', async (req, res) => {
  const { title, description, code, category, stock, price } = req.body

  if (title && description && code && category && stock && price) {
    const data = await readFile(file)
    const id = data.length === 0 ? 1 : parseInt(data[data.length - 1].id) + 1
    data.push({ id, ...req.body, status: true })
    await writeFile(data, file)
    res.json(data)
  } else res.status(400).json({ error: 'All fields required' })
})

router.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const body = req.body
  const data = await readFile(file)
  const find = data.find(x => x.id === +pid)

  if (find) {
    data[data.indexOf(find)] = { ...find, ...body }
    await writeFile(data, file)
    res.json(data)
  } else res.status(404).json({ error: 'Product not found' })
})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const data = await readFile(file)
  const index = data.findIndex(x => x.id === +pid)

  if (index !== -1) {
    const productDelete = data.splice(index, 1)
    await writeFile(data, file)
    res.json(productDelete)
  } else res.status(404).json({ error: 'Product not found' })
})

export default router
