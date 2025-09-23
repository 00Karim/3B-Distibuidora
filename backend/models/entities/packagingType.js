const mongoose = require("mongoose")
const PackageType = require("../enums/PackageType")

const packagingTypeSchema = new mongoose.Schema({
    package: {type: String, enum: Object.values(PackageType), require: true},
    amount: {type: Number, require: true}
})

 module.exports = mongoose.model("PackagingType",packagingTypeSchema)