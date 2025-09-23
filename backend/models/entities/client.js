const mongoose = require("mongoose")
const addressSchema = require("./address")

const clientSchema = new mongoose.Schema({
    name: {type: String, require: true},
    whatsapp: {type: String, require:true},
    email: {type: String, require: true},
    dni: {type: Number, require: true},
    adress: addressSchema
})

module.exports = mongoose.model("Client", clientSchema)