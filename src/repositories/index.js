import Products from '../dao/classes/products.dao.js'
import ProductsRepository from './products.repository.js'
import Users from '../dao/classes/users.dao.js'
import UsersRepository from './users.repository.js'

export const productsServices = new ProductsRepository(new Products())
export const usersServices = new UsersRepository(new Users())
