import { productsModel } from '../models/products.model.js'

export const getAllProductsDB = async (filter, options) => {
  try {
    await productsModel.paginate(filter, options)
  } catch (error) {
    console.log('error: ' + error)
  }
}

export const getProductByIdDB = async pid => {
  try {
    await productsModel.find({ _id: pid })
  } catch (error) {
    console.log('error: ' + error)
  }
}

export const createProductDB = async (title, description, code, price, image, category, stock) => {
  try {
    productsModel.create({
      title,
      description,
      code,
      price,
      image,
      category,
      stock
    })
  } catch (error) {
    console.log('error: ' + error)
  }
}

export const editProductDB = async (pid, stock) => {
  try {
    await productsModel.updateOne({ _id: pid }, { stock })
  } catch (error) {
    console.log('error: ' + error)
  }
}

export const deleteProductDB = async pid => {
  try {
    await productsModel.deleteOne({ _id: pid })
  } catch (error) {
    console.log('error: ' + error)
  }
}
