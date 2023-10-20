import { usersModel } from '../models/users.model.js'

export default class Users {
  get = async () => {
    try {
      const result = await usersModel.find()
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  login = async email => {
    try {
      const user = await usersModel.findOne({ email }, { password: 0 })
      return user
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

  delete = async uid => {
    try {
      const result = await usersModel.deleteOne({ _id: uid })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }
}
