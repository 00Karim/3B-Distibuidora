const mongoose = require("mongoose")
const PackageType = require("../enums/PackageType")

const packagingTypeSchema = new mongoose.Schema({
    package: {
                type: String, 
                enum: Object.values(PackageType),
                default: PackageType.BAG, 
                required: true
            },
    amount: {type: Number, required: true, default: 1}
})

 module.exports = mongoose.model("PackagingType", packagingTypeSchema)