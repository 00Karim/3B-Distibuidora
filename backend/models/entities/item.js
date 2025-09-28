const mongoose = require("mongoose")
const Product = require("./product")

const itemSchema = new mongoose.Schema({
    product: {type: Product.schema, required: true},
    pricePerUnit: {type: Number, min: 1, required: true},
    totalPrice: {type: Number, min: 0, required: true},
    amount: {type: Number, default: 1, min: 1},
    weight: {type: Number, min: 0},
    isAvailable: {type: Boolean, required: true},
    remarks: {type: String}
})

module.exports = mongoose.model("Item", itemSchema)