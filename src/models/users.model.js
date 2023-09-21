import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  age: { type: Number },
  password: { type: String }
})

export const usersModel = mongoose.model('users', usersSchema)
