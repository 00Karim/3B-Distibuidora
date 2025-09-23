const mongoose = require("mongoose")
const productSchema = require("./product")

const itemSchema = new mongoose.Schema({
    product: {type: productSchema, require: true},
    pricePerUnit: {type: Number, require: true},
    totalPrice: {type: Number, require: true},
    amount: {type: Number, default: 1, min: 1},
    weight: {type: Number},
    isAvailable: {type: Boolean, require: true},
    remarks: {type: String}
})

module.exports = ("Item", itemSchema)