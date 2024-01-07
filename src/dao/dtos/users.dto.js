import { createHash } from '../../utils.js'

export class UserDTO {
  constructor(user) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.role = user.role
    this.last_connection = user.last_connection
    this._id = user._id
  }
}
export class CreateUserDTO {
  constructor(user) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.age = user.age
    this.role = user.role
    this.documents = user.documents
    this.last_connection = Date.now()
    this.password = createHash(user.password)
  }
}
