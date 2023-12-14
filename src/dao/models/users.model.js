import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    age: { type: Number },
    password: { type: String },
    role: { type: String, default: 'user' },
    documents: [
      {
        name: { type: String },
        reference: { type: String }
      }
    ],
    last_connection: { type: Date }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const usersModel = mongoose.model('users', usersSchema)
