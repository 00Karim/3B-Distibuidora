const mongoose = require("mongoose")
const categorySchema = require("./category")
const MeasurementUnit = require("../enums/MeasurementUnit")

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String, require: true},
    description: {type: String},
    category: {type: categorySchema, require: true},
    unitOfMeasure: {type: String, enum: Object.values(MeasurementUnit), require: true},
    stock: {type: Number, require: true},
    glutenFree: {type: Boolean, require: true},
    brand: {type: String}
})

module.exports = new mongoose.model("Product", productSchema)