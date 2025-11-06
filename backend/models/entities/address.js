const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: {type: String, required: true},
    number: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    postalCode: {type: Number, required: true}
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

module.exports = new mongoose.model("Address", addressSchema)