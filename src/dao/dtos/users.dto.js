import { createHash } from '../../utils.js'

export default class UserDTO {
  constructor(user) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.age = user.age
    this.role = user.role
    this.documents = user.documents
    this.last_connection = user.last_connection
    this.password = createHash(user.password)
  }
}
