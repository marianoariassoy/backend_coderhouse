import mongoose from 'mongoose'

const ticketsSchema = new mongoose.Schema(
  {
    code: { type: String },
    amount: { type: Number },
    purchaser: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const ticketsModel = mongoose.model('tickets', ticketsSchema)
