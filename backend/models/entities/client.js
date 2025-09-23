const mongoose = require("mongoose")
const Address = require("./address")

const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    whatsapp: {type: String, required:true},
    email: {type: String, required: true},
    dni: {type: Number, required: true},
    adress: {type: Address.schema, required: true}
})

module.exports = mongoose.model("Client", clientSchema)