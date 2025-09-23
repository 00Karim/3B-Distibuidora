const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    stree: {type: String, required: true},
    number: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    postalCode: {type: Number, required: true}
})

module.exports = new mongoose.model("Address", addressSchema)