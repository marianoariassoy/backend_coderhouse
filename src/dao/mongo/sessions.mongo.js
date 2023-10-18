import { usersModel } from './models/users.model.js'

export default class Sessions {
  get = async email => {
    try {
      const user = await usersModel.findOne({ email }, { firstName: 1, lastName: 1, age: 1, password: 1, email: 1 })
      return user
    } catch (error) {
      console.log('error: ' + error)
    }
  }

  create = async (firstName, lastName, email, age, password) => {
    try {
      const user = await usersModel.create({ firstName, lastName, email, age, password })
      return user
    } catch (error) {
      console.log('error: ' + error)
    }
  }
}
