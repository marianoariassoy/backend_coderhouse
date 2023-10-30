import { ticketsModel } from '../models/tickets.model.js'

export default class Carts {
  get = async () => {
    try {
      const result = await ticketsModel.find()
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  getById = async cid => {
    try {
      const result = await ticketsModel.findOne({ _id: cid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  create = async data => {
    try {
      const result = await ticketsModel.create(data)
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  delete = async cid => {
    try {
      const result = await ticketsModel.deleteOne({ _id: cid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }
}
