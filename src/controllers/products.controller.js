import {
  getAllProductsDB,
  getProductByIdDB,
  createProductDB,
  editProductDB,
  deleteProductDB
} from '../persistence/products.persistence.js'

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const sort = req.query.sort === 'asc' ? { price: 1 } : req.query.sort === 'desc' ? { price: -1 } : {}
    const filter = req.query.category === 'all' ? {} : req.query.category ? { category: req.query.category } : {}

    const options = {
      page,
      limit,
      sort
    }

    const products = await getAllProductsDB(filter, options)

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
  } catch (error) {
    console.log('error: ' + error)
  }
}

export const getProductById = async (req, res) => {
  const { pid } = req.params
  const result = await getProductByIdDB(pid)
  res.send({ status: 'success', payload: result })
}

export const createProduct = async (req, res) => {
  const { title, description, code, price, image, category, stock } = req.body
  const result = await createProductDB(title, description, code, price, image, category, stock)
  res.send({ status: 'success', payload: result })
}

export const editProduct = async (req, res) => {
  const { pid } = req.params
  const { stock } = req.body
  if (stock < 0) return res.send({ status: 'error', error: 'Incomplete values' })
  const result = await editProductDB(pid, stock)
  res.send({ status: 'success', payload: result })
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params
  const result = deleteProductDB(pid)
  res.send({ status: 'success', payload: result })
}
