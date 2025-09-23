const mongoose = require("mongoose")
const productSchema = require("./product")

const itemSchema = new mongoose.Schema({
    product: {type: productSchema, require: true},
    name: {type: String, require: true},
    pricePerUnit: {type: Number, require: true},
    totalPrice: {type: Number, require: true},
    amount: {type: Number, require: true},
    weight: {type: Number},
    isAvailable: {type: Boolean, require: true},
    remarks: {type: String}
})

module.exports = ("Item", itemSchema)