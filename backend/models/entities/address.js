const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    stree: {type: String, require: true},
    number: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    postalCode: {type: Number, require: true}
})

module.exports = new mongoose.model("Address", addressSchema)