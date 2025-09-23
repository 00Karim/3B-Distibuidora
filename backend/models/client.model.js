const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name: {type: string, require: true},
    whatsapp: {type: string, require:true},
    email: {type: string, require: true},
    dni: {type: number, require: true},
    adress: adressSchema
})

module.exports = mongoose.model("Client", clientSchema)