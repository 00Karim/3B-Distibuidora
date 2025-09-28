const mongoose = require("mongoose")
const Category = require("./category")
const MeasurementUnit = require("../enums/MeasurementUnit")

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, min: 0, required: true},
    image: {type: String, required: true},
    description: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    unitOfMeasure: {type: String, enum: Object.values(MeasurementUnit), required: true},
    stock: {type: Number, min: 0, required: true},
    glutenFree: {type: Boolean, required: true},
    brand: {type: String}
})

module.exports = new mongoose.model("Product", productSchema)