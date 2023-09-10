import { Router } from 'express'
import { productsModel } from '../models/products.model.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const sort = req.query.sort === 'asc' ? { price: 1 } : req.query.sort === 'desc' ? { price: -1 } : {}
    const filter = req.query.category ? { category: req.query.category } : {}

    const options = {
      page,
      limit,
      sort
    }

    const products = await productsModel.paginate(filter, options)

    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?page=${page - 1}&limit=${limit}&sort=${req.query.sort}&category=${
          req.query.category
        }`
      : null
    const nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?page=${page + 1}&limit=${limit}&sort=${req.query.sort}&category=${
          req.query.category
        }`
      : null

    res.send({ result: 'success', payload: products, prevLink, nextLink })
    // console.log(options)
  } catch (error) {
    console.log('error: ' + error)
  }
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const result = await productsModel.find({ _id: pid })
  res.send({ status: 'success', payload: result })
})

router.post('/', async (req, res) => {
  const { title, description, code, price, image, category, stock } = req.body

  const result = await productsModel.create({
    title,
    description,
    code,
    price,
    image,
    category,
    stock
  })
  res.send({ status: 'success', payload: result })
})

router.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const { stock } = req.body
  if (stock < 0) return res.send({ status: 'error', error: 'Incomplete values' })
  const result = await productsModel.updateOne({ _id: pid }, { stock })
  res.send({ status: 'success', payload: result })
})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const result = await productsModel.deleteOne({ _id: pid })
  res.send({ status: 'success', payload: result })
})

export default router
