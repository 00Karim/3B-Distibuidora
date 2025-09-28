const mongoose = require("mongoose")
const Product = require("./product")

const itemSchema = new mongoose.Schema({
    product: {type: Product.schema, require: true},
    pricePerUnit: {type: Number, min: 1, require: true},
    totalPrice: {type: Number, min: 0, require: true},
    amount: {type: Number, default: 1, min: 1},
    weight: {type: Number, min: 0},
    isAvailable: {type: Boolean, require: true},
    remarks: {type: String}
})

module.exports = ("Item", itemSchema)