import { productsModel } from './models/products.model.js'

export default class Products {
  get = async (filter, options) => {
    try {
      const products = await productsModel.paginate(filter, options)
      return products
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  getById = async pid => {
    try {
      const product = await productsModel.find({ _id: pid })
      return product
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  create = async (title, description, code, price, image, category, stock) => {
    try {
      const product = await productsModel.create({
        title,
        description,
        code,
        price,
        image,
        category,
        stock
      })
      return product
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  edit = async (pid, stock) => {
    try {
      const product = await productsModel.updateOne({ _id: pid }, { stock })
      return product
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  delete = async pid => {
    try {
      await productsModel.deleteOne({ _id: pid })
    } catch (error) {
      console.log('error: ' + error)
    }
  }
}
