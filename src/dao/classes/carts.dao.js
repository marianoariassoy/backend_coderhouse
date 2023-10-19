import { cartsModel } from '../models/carts.model.js'

export default class Carts {
  get = async () => {
    try {
      const result = await cartsModel.find().populate('products.product')
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  getById = async cid => {
    try {
      const result = await cartsModel.findOne({ _id: cid }).populate('products.product')
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  create = async () => {
    try {
      const result = await cartsModel.create({})
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  edit = async (cid, products) => {
    try {
      const result = await cartsModel.updateOne({ _id: cid }, { products })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  delete = async cid => {
    try {
      const result = await cartsModel.deleteOne({ _id: cid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }
}
