const mongoose = require("mongoose")
const PackageType = require("../enums/PackageType")

const packagingType = new mongoose.Schema({
    package: {type: String, enum: Object.values(PackageType), require: true},
    amount: {type: Number, require: true}
})