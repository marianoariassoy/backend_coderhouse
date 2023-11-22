import { productsModel } from '../models/products.model.js'

export default class Products {
  get = async (filter, options) => {
    try {
      const result = await productsModel.paginate(filter, options)
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  getById = async pid => {
    try {
      const result = await productsModel.findOne({ _id: pid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  create = async ({ title, description, code, price, image, category, stock, owner }) => {
    try {
      const result = await productsModel.create({
        title,
        description,
        code,
        price,
        image,
        category,
        stock,
        owner
      })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  edit = async (pid, stock) => {
    try {
      const result = await productsModel.updateOne({ _id: pid }, { stock })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  delete = async pid => {
    try {
      const result = await productsModel.deleteOne({ _id: pid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }
}
