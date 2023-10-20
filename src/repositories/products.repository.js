import ProductDTO from '../dao/dtos/products.dto.js'

export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao
  }
  async get(filter, options) {
    const products = await this.dao.get(filter, options)
    return products
  }

  async getById(id) {
    const products = await this.dao.getById(id)
    return products
  }

  async create(product) {
    const productDTO = new ProductDTO(product)
    const result = await this.dao.create(productDTO)
    return result
  }

  async delete(id) {
    const result = await this.dao.delete(id)
    return result
  }

  async edit(id, stock) {
    const result = await this.dao.edit(id, stock)
    return result
  }
}
