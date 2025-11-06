const mongoose = require("mongoose")
const Product = require("./product")

const itemSchema = new mongoose.Schema({
    product: {type: Product.schema, required: true},
    pricePerUnit: {type: Number},
    // deduction: {type: Number, min: 0, max: 0.99, default: null},
    totalPrice: {type: Number, min: 0, required: true},
    amount: {type: Number, default: 1, min: 1},
    weight: {type: Number, min: 0},
    isAvailable: {type: Boolean, required: true},
    remarks: {type: String}
},
{
    // cuando llamamos toObject se va a borrar el id y el v que es data ineccesaria para nosotros ya que item va a ser un documento embebido
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
}
)

module.exports = mongoose.model("Item", itemSchema)