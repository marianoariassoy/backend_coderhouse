import { cartsModel } from './models/carts.model.js'
import { productsModel } from './models/products.model.js'

export default class Carts {
  get = async () => {
    try {
      const carts = await cartsModel.find().populate('products.product')
      return carts
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  getById = async cid => {
    try {
      const cart = await cartsModel.findOne({ _id: cid }).populate('products.product')
      return cart
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  create = async () => {
    try {
      const cart = await cartsModel.create({})
      return cart
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  edit = async (cid, products) => {
    try {
      await cartsModel.updateOne({ _id: cid }, { products })
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  editProduct = async (cid, pid, quantity) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid })

      if (cart) {
        const products = cart.products
        const find = products.find(x => x.product == pid)

        if (find) {
          find.quantity = quantity || find.quantity + 1
          await cartsModel.updateOne({ _id: cid }, { products })
          return cart
        } else {
          const product = await productsModel.findOne({ _id: pid })

          products.push({ product: product.id, quantity: quantity || 1 })
        }

        await cartsModel.updateOne({ _id: cid }, { products })
        return cart
      }
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  deleteProduct = async (cid, pid) => {
    try {
      const cart = await cartsModel.find({ _id: cid })

      if (cart.length > 0) {
        const products = cart[0].products
        if (products.length > 0) {
          const result = products.filter(x => x.product != pid)
          await cartsModel.updateOne({ _id: cid }, { products: result })
          return result
        }
      }
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  delete = async cid => {
    try {
      const cart = await cartsModel.find({ _id: cid })

      if (cart.length > 0) {
        await cartsModel.deleteOne({ _id: cid })
        return cart
      }
    } catch (error) {
      console.log('error: ' + error)
    }
  }
}
