import Carts from '../dao/mongo/carts.mongo.js'
import Products from '../dao/mongo/products.mongo.js'
const cartsServices = new Carts()
const productsServices = new Products()

export const getAllCarts = async (req, res) => {
  const result = await cartsServices.get()
  res.send({ status: 'success', payload: result })
}

export const getCart = async (req, res) => {
  const { cid } = req.params
  const result = await cartsServices.getById(cid)
  res.send({ status: 'success', payload: result })
}

export const createCart = async (req, res) => {
  const result = await cartsServices.create()
  res.send({ status: 'success', payload: result })
}

export const addProduct = async (req, res) => {
  const { cid } = req.params
  const { product } = req.body
  const cart = await cartsServices.getById(cid)

  if (cart) {
    const products = cart.products || []

    if (products.length > 0) {
      const find = products.find(x => x.product._id.toString() === product)
      if (find) {
        find.quantity++
      } else {
        products.push({ product, quantity: 1 })
      }
    } else {
      products.push({ product, quantity: 1 })
    }

    await cartsServices.edit(cid, products)
    res.send({ status: 'success', payload: cart })
  } else res.status(404).json({ message: 'Cart not found' })
}

export const editProduct = async (req, res) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  const cart = await cartsServices.getById(cid)

  if (cart) {
    const products = cart.products
    const find = products.find(x => x.product._id.toString() === pid)

    if (find) {
      find.quantity = quantity || find.quantity + 1
      await cartsServices.edit(cid, products)
      res.send({ status: 'success', payload: cart })
    } else {
      const product = await productsServices.getById(pid)

      if (!product) {
        res.status(404).json({ message: 'Product not found' })
      }

      products.push({ product: product.id, quantity: quantity || 1 })
      res.send({ status: 'product upload to cart', payload: cart })
    }

    await cartsServices.edit(cid, products)
  } else res.status(404).json({ message: 'Cart not found' })
}

export const deleteProduct = async (req, res) => {
  const { cid, pid } = req.params
  const result = await cartsServices.deleteProduct(cid, pid)
  res.send({ status: 'product deleted', payload: result })
}

export const deleteCart = async (req, res) => {
  const { cid } = req.params
  const result = await cartsServices.delete(cid)
  res.send({ status: 'cart deleted', payload: result })
}
