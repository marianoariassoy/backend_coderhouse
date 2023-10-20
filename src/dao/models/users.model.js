import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    age: { type: Number },
    password: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const usersModel = mongoose.model('users', usersSchema)
