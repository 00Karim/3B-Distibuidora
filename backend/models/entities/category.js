const mongoose = require("mongoose")

const categorySchema= new mongoose.Schema({ // aplicamos el patron de diseno Composite
    name: {type: String, required: true},
    subcategories: [{type: mongoose.Schema.Types.Mixed}]
})

categorySchema.add({
    subcategories: [categorySchema] //no usamos schema porque categorySchema ya esta en forma de schema
})
module.exports = mongoose.model("Category", categorySchema)