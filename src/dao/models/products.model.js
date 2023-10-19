import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  code: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true, index: true },
  stock: { type: Number },
  status: { type: Boolean, default: true }
})

productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model('products', productsSchema)
