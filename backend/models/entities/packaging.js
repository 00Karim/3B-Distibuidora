const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const PackageType = require("../enums/PackageType"

)
const packagingSchema = new Schema({
    package: {type: PackageType, default: PackagingType.BAG, require: true},
    amount: {type: number, default: 1, min: 1, require: true} 
})

module.exports = mongoose.model("PackagingType", packagingSchema)