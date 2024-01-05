import { productsServices } from '../repositories/index.js'
import { emailDeleteProducts } from '../utilities/mailing.js'

export const deleteById = async (req, res) => {
  const product = await productsServices.getById(req.params.pid)
  if (!product) return res.status(400).send({ status: 'error', error: 'product not found' })

  if (req.user.role === 'user') {
    return res.status(401).send({ status: 'error', error: 'unauthorized' })
  }

  if (req.user.role === 'premium') {
    if (product.owner !== req.user.email) return res.status(401).send({ status: 'error', error: 'unauthorized' })
  }

  if (product.owner !== 'admin') {
    const email = product.owner
    emailDeleteProducts(email)
  }

  const result = await productsServices.delete(req.params.pid)
  res.send({ status: 'product deleted', payload: result })
}

export const get = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const sort = req.query.sort === 'asc' ? { price: 1 } : req.query.sort === 'desc' ? { price: -1 } : {}
  const filter = req.query.category === 'all' ? {} : req.query.category ? { category: req.query.category } : {}

  const options = {
    page,
    limit,
    sort
  }

  const products = await productsServices.get(filter, options)

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

  res.send({ result: 'success', payload: { ...products, prevLink, nextLink } })
}

export const getById = async (req, res) => {
  const result = await productsServices.getById(req.params.pid)
  if (!result) return res.status(400).send({ status: 'error', error: 'product not found' })
  res.send({ status: 'success', payload: result })
}

export const create = async (req, res) => {
  const owner = req.user.role === 'premium' ? req.user.email : null
  const result = await productsServices.create({ ...req.body, owner })
  if (!result) return res.status(400).send({ status: 'error', error: 'product not created' })
  res.send({ status: 'product created', payload: result })
}

export const edit = async (req, res) => {
  const product = await productsServices.getById(req.params.pid)
  if (!product) return res.status(400).send({ status: 'error', error: 'product not found' })

  const result = await productsServices.edit(req.params.pid, req.body.stock)
  if (!result) return res.send({ status: 'error', error: 'product not edited' })
  res.send({ status: 'product edited', payload: result })
}
