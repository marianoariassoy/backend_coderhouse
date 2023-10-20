import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: String, index: true },
    stock: { type: Number },
    status: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model('products', productsSchema)
