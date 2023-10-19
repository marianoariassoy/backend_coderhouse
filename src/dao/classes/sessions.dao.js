import { usersModel } from '../models/users.model.js'

export default class Sessions {
  get = async email => {
    try {
      const result = await usersModel.findOne({ email }, { firstName: 1, lastName: 1, age: 1, password: 1, email: 1 })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  create = async (firstName, lastName, email, age, password) => {
    try {
      const result = await usersModel.create({ firstName, lastName, email, age, password })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }
}
