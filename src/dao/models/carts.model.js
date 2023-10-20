import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
          },
          quantity: Number
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const cartsModel = mongoose.model('carts', cartsSchema)
