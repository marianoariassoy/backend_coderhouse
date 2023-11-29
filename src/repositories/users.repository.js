import UserDTO from '../dao/dtos/users.dto.js'

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao
  }
  async get() {
    const result = await this.dao.get()
    return result
  }

  async getById(id) {
    const result = await this.dao.getById(id)
    return result
  }

  async getByEmail(email) {
    const result = await this.dao.getByEmail(email)
    return result
  }

  async create(user) {
    const userDTO = new UserDTO(user)
    const result = await this.dao.create(userDTO)
    return result
  }

  async edit(id, user) {
    const userDTO = new UserDTO(user)
    const result = await this.dao.edit(id, userDTO)
    return result
  }

  async changeRole(id, role) {
    const result = await this.dao.changeRole(id, role)
    return result
  }

  async delete(id) {
    const result = await this.dao.delete(id)
    return result
  }
}
