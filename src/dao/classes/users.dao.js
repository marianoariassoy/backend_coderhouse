import { usersModel } from '../models/users.model.js'

export default class Users {
  get = async () => {
    try {
      const result = await usersModel.find({}, { password: 0 })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  getById = async id => {
    try {
      const result = await usersModel.findOne({ _id: id })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  getByEmail = async email => {
    try {
      const result = await usersModel.findOne({ email })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  create = async user => {
    try {
      const email = user.email
      const find = await usersModel.findOne({ email })
      if (find) {
        return null
      }
      const result = await usersModel.create({ ...user })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  edit = async (id, data) => {
    try {
      const result = await usersModel.updateOne({ _id: id }, { ...data })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  updateConnection = async (id, date) => {
    try {
      const result = await usersModel.updateOne({ _id: id }, { last_connection: date })
      return result
    } catch (error) {
      console.log('error: ' + error)
      return null
    }
  }

  // changeRole = async (id, role) => {
  //   try {
  //     const result = await usersModel.updateOne({ _id: id }, { role })
  //     return result
  //   } catch (error) {
  //     console.log('error: ' + error)
  //     return null
  //   }
  // }

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
