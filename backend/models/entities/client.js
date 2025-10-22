const mongoose = require("mongoose")
const Address = require("./address")

const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    whatsapp: {type: String, required:true},
    email: {type: String, required: true},
    dni: {type: Number, required: true},
    address: {type: Address.schema, required: true}
},
{
    // cuando llamamos toObject se va a borrar el id y el v que es data ineccesaria para nosotros ya que item va a ser un documento embebido
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
})

module.exports = mongoose.model("Client", clientSchema)